import React, { useState, useEffect } from 'react';

// Removed getRandomDocumentType and getRandomFileExtension as they are no longer used.

const Documents = () => {
  const [userId, setUserId] = useState(''); // userId will be simulated
  const [userDocuments, setUserDocuments] = useState({}); // Categorized documents
  const [loading, setLoading] = useState(true);
  // Removed error and setError as they are no longer used.

  // Local state to hold raw document data (pre-populated for display)
  const [localDocuments, setLocalDocuments] = useState([]);

  // Simulate user ID and initial loading, and pre-populate documents
  useEffect(() => {
    const simulatedUserId = 'user_' + Math.random().toString(36).substring(2, 10);
    setUserId(simulatedUserId);

    // Pre-populate with sample documents to match the user's request
    const initialDocs = [
      {
        id: 'doc1',
        userId: simulatedUserId,
        fileName: 'Performance-Review-356144.jpg',
        fileType: 'jpg',
        documentType: 'Performance Review',
        uploadDate: new Date('2025-07-16T10:00:00Z'),
        downloadUrl: 'https://placehold.co/600x400/000000/FFFFFF?text=Performance+Review+Preview',
      },
      {
        id: 'doc2',
        userId: simulatedUserId,
        fileName: 'Explanation-Letter-350005.doc',
        fileType: 'doc',
        documentType: 'Explanation Letter',
        uploadDate: new Date('2025-07-16T10:05:00Z'),
        downloadUrl: 'https://placehold.co/600x400/000000/FFFFFF?text=Explanation+Letter+Preview',
      },
      {
        id: 'doc3',
        userId: simulatedUserId,
        fileName: 'Show-Cause-Notice-352603.pdf',
        fileType: 'pdf',
        documentType: 'Show Cause Notice',
        uploadDate: new Date('2025-07-16T10:10:00Z'),
        downloadUrl: 'https://placehold.co/600x400/000000/FFFFFF?text=Show+Cause+Notice+Preview',
      },
      {
        id: 'doc4',
        userId: simulatedUserId,
        fileName: 'Resume-362161.pdf',
        fileType: 'pdf',
        documentType: 'Resume',
        uploadDate: new Date('2025-07-16T10:15:00Z'),
        downloadUrl: 'https://placehold.co/600x400/000000/FFFFFF?text=Resume+Preview',
      },
      {
        id: 'doc5',
        userId: simulatedUserId,
        fileName: 'Transfer-Order-671821.jpg',
        fileType: 'jpg',
        documentType: 'Transfer Order',
        uploadDate: new Date('2025-07-16T10:20:00Z'),
        downloadUrl: 'https://placehold.co/600x400/000000/FFFFFF?text=Transfer+Order+Preview',
      },
      // Add more dummy documents if needed
    ].sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime()); // Sort by date descending

    setLocalDocuments(initialDocs);
    setLoading(false);
  }, []);

  // Effect to categorize documents whenever localDocuments or userId changes
  useEffect(() => {
    if (!userId) return;

    const categorized = localDocuments.reduce((acc, doc) => {
      const type = doc.documentType || 'Other Documents';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(doc);
      return acc;
    }, {});
    setUserDocuments(categorized);
  }, [localDocuments, userId]);

  // Removed handleSimulateUpload function as it's no longer needed for a button
  // The initial population handles the display requirement.

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="text-lg animate-pulse">Loading documents...</p>
      </div>
    );
  }

  // Removed the error display block as the error state is no longer used.

  const documentTypesOrder = [
    'ID Card',
    'Certificate',
    'Leave Application',
    'Performance Review',
    'Transfer Order',
    'Explanation Letter',
    'Show Cause Notice',
    'Resume',
    'Medical Report',
    'Other Documents', // Always last
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-inter antialiased">
      <header className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-4 rounded-b-xl shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center">My Documents</h1>
        <p className="text-sm opacity-90">
          Your User ID: <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded-md">{userId}</span>
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {Object.keys(userDocuments).length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10 p-4 rounded-lg">
            <p className="text-lg mb-4">No documents to display.</p>
          </div>
        ) : (
          <>
            {documentTypesOrder.map(type => {
              const docs = userDocuments[type];
              if (!docs || docs.length === 0) return null;

              return (
                <section key={type} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-purple-400 pb-2">
                    {type}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-white dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            File Name
                          </th>
                          <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Uploaded Date
                          </th>
                          <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {docs.map(doc => (
                          <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                            <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
                              {doc.fileName}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {doc.uploadDate?.toLocaleDateString() || 'N/A'}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm">
                              <a
                                href={doc.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full shadow-md hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}
          </>
        )}
      </main>

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

export default Documents;
