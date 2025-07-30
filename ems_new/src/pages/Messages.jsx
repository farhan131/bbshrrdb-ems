import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app'; // Import getApps
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const Messages = () => {
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [aiAssistSuggestion, setAiAssistSuggestion] = useState('');
  const messagesEndRef = useRef(null);

  // New state for selected chat partner and available partners
  const [selectedChatPartnerId, setSelectedChatPartnerId] = useState(null); // null means public chat
  const [availableChatPartners, setAvailableChatPartners] = useState([]);

  // Global variables provided by the Canvas environment
  // These are now accessed directly inside useEffect to avoid linting issues
  // eslint-disable-next-line no-undef
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';


  useEffect(() => {
    // Move initialization of firebaseConfig and initialAuthToken inside useEffect
    // eslint-disable-next-line no-undef
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    // eslint-disable-next-line no-undef
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    // Set the Firebase Project ID and API Key as requested by the user
    firebaseConfig.projectId = 'bbshrrdb-48102';
    firebaseConfig.apiKey = 'AIzaSyDKgepu685yfFxgfna8oIM6oSNAHa5giUc'; // Set the provided API Key here

    let app;
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      // If app is already initialized, get the existing one
      if (!getApps().length) {
         console.error("Error initializing Firebase app:", error);
         setIsAuthReady(true); // Ensure UI doesn't get stuck
         return;
      }
      app = getApps()[0]; // Get the default app if already initialized
    }


    const firestore = getFirestore(app);
    const firebaseAuth = getAuth(app);
    setDb(firestore);

    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setIsAuthReady(true);
      } else {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(firebaseAuth, initialAuthToken);
          } else {
            await signInAnonymously(firebaseAuth);
          }
        } catch (err) {
          console.error('Auth error:', err);
          setIsAuthReady(true); // Still set ready even if sign-in fails to avoid blocking UI
        }
      }
    });

    return () => unsubscribeAuth();
  }, []); // Dependencies are now empty as firebaseConfig and initialAuthToken are local to this effect

  useEffect(() => {
    if (!db || !isAuthReady) return;

    const messagesRef = collection(db, `artifacts/${appId}/public/data/messages`);
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const allFetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Extract unique sender and receiver IDs for available chat partners
        const uniquePartners = new Set();
        allFetchedMessages.forEach(msg => {
          if (msg.senderId && msg.senderId !== userId) {
            uniquePartners.add(msg.senderId);
          }
          if (msg.receiverId && msg.receiverId !== userId) {
            uniquePartners.add(msg.receiverId);
          }
        });
        setAvailableChatPartners(Array.from(uniquePartners));

        // Filter messages based on selected chat partner
        const filteredMessages = allFetchedMessages.filter(msg => {
          if (selectedChatPartnerId === null) {
            // Public chat: show messages without a receiverId or explicitly 'public' receiverId
            return !msg.receiverId || msg.receiverId === 'public';
          } else {
            // Direct message: show messages between current user and selected partner
            return (
              (msg.senderId === userId && msg.receiverId === selectedChatPartnerId) ||
              (msg.senderId === selectedChatPartnerId && msg.receiverId === userId)
            );
          }
        });

        // Ensure messages are sorted by timestamp
        filteredMessages.sort((a, b) => (a.timestamp?.toMillis() || 0) - (b.timestamp?.toMillis() || 0));
        setMessages(filteredMessages);
      },
      (err) => console.error('Snapshot error:', err)
    );

    return () => unsubscribe();
  }, [db, isAuthReady, appId, userId, selectedChatPartnerId]); // Added userId and selectedChatPartnerId to dependencies

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessageText.trim() || !db || !userId) return;

    const messagesRef = collection(db, `artifacts/${appId}/public/data/messages`);
    const messageData = {
      senderId: userId,
      senderName: `User-${userId.slice(0, 5)}`,
      text: newMessageText.trim(),
      timestamp: serverTimestamp(),
    };

    if (selectedChatPartnerId !== null) {
      messageData.receiverId = selectedChatPartnerId;
    } else {
      messageData.receiverId = 'public'; // Explicitly mark public messages
    }

    try {
      await addDoc(messagesRef, messageData);
      setNewMessageText('');
      setAiAssistSuggestion('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleQuickReply = (reply) => setNewMessageText(reply);

  const handleAiAssist = () => {
    const txt = newMessageText.toLowerCase();
    let suggestion = 'How about a positive opening? "Hope you\'re well!"';

    if (txt.includes('hello') || txt.includes('hi')) {
      suggestion = 'Consider adding a friendly emoji! 👋';
    } else if (txt.includes('thank you') || txt.includes('thanks')) {
      suggestion = 'Maybe add a 🙏 or ✨?';
    } else if (txt.length > 50 && !txt.includes('?')) {
      suggestion = 'This is a bit long. Can you make it more concise?';
    } else if (txt.includes('meeting')) {
      suggestion = 'Suggesting "When works for you?"';
    }

    setAiAssistSuggestion(suggestion);
  };

  const quickReplies = [
    'Sounds good!',
    'On my way!',
    'Got it, thanks!',
    "What's up?",
    "I'll get back to you.",
  ];

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="text-lg animate-pulse">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-inter antialiased">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 rounded-b-xl shadow-lg flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-center sm:text-left mb-2 sm:mb-0">Dynamic Chat Messenger</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <p className="text-sm opacity-90">
            Your User ID: <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded-md">{userId}</span>
          </p>
          <select
            className="p-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            value={selectedChatPartnerId || 'public'}
            onChange={(e) => setSelectedChatPartnerId(e.target.value === 'public' ? null : e.target.value)}
          >
            <option value="public">Public Chat</option>
            {availableChatPartners.map(partnerId => (
              <option key={partnerId} value={partnerId}>
                {partnerId === userId ? `(You) ${partnerId.slice(0, 5)}` : `User-${partnerId.slice(0, 5)}`}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-md relative group
                  ${msg.senderId === userId
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
              >
                <p className="font-semibold text-sm mb-1 opacity-90">
                  {msg.senderId === userId ? 'You' : msg.senderName}
                  {msg.receiverId && msg.receiverId !== 'public' && msg.receiverId !== userId && (
                    <span className="ml-2 text-xs opacity-70">to User-{msg.receiverId.slice(0, 5)}</span>
                  )}
                </p>
                <p className="text-base break-words">{msg.text}</p>
                <span className="block text-xs text-right mt-1 opacity-70">
                  {msg.timestamp?.toDate?.().toLocaleTimeString?.([], { hour: '2-digit', minute: '2-digit' }) || ''}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-t-xl">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((r, i) => (
            <button
              key={i}
              onClick={() => handleQuickReply(r)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {r}
            </button>
          ))}
        </div>

        {aiAssistSuggestion && (
          <div className="mb-3 p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg shadow-inner flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9.293 12.95a1 1 0 00.707.293h.001c.266 0 .52-.105.707-.293l2-2a1 1 0 10-1.414-1.414L10 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2z" clipRule="evenodd"></path></svg>
            AI Suggestion: {aiAssistSuggestion}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <textarea
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 resize-none h-16 custom-scrollbar"
            placeholder={selectedChatPartnerId ? `Message User-${selectedChatPartnerId.slice(0,5)}...` : "Type your public message..."}
          />
          <button
            onClick={handleAiAssist}
            className="p-3 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
            title="AI Assist"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1a1 1 0 100 2h1a1 1 0 01.707 1.707l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 013 13H2a1 1 0 100-2h1a1 1 0 01.707-1.707l7-7z"></path></svg>
          </button>
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Send Message"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
    </div>
  );
};

export default Messages;
