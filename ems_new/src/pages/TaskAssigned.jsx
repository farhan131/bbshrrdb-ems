import React, { useState } from 'react';
import { Calendar, User, FileText, Send, Upload, Info, Clock } from 'lucide-react'; // Added Clock icon for duration

function TaskAssigned() {
  // State variables for form inputs
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState(''); // New state for Start Date
  const [dueDate, setDueDate] = useState('');
  const [duration, setDuration] = useState(''); // New state for Duration
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Summary display state
  const [submittedTask, setSubmittedTask] = useState(null);

  const showMessageBox = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const hideMessageBox = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: `t${Date.now()}`,
      name: taskName,
      assignedTo: assignedTo,
      startDate: startDate, // Include new start date
      dueDate: dueDate,
      duration: duration, // Include new duration
      description: taskDescription,
      status: status,
      reasonIncomplete: '',
    };

    console.log('New Task Assigned:', newTask);

    showMessageBox(
      `Task "${newTask.name}" assigned to ${newTask.assignedTo} from ${newTask.startDate} to ${newTask.dueDate} (Duration: ${newTask.duration}) with description: "${newTask.description}"!`
    );

    // Store the submitted task for summary display
    setSubmittedTask(newTask);

    // Reset fields
    setTaskName('');
    setAssignedTo('');
    setStartDate(''); // Reset new field
    setDueDate('');
    setDuration(''); // Reset new field
    setTaskDescription('');
    setStatus('Pending');
  };

  const handleUploadClick = () => {
    showMessageBox('Upload functionality is not implemented yet. This is a placeholder.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 font-inter">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Task</h1>
          <p className="text-lg text-gray-600">Fill out the form to assign a new task.</p>
        </header>

        {/* Original H1 removed as it's replaced by the header */}
        {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Complete Your Task
        </h1> */}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Name */}
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline-block mr-2 text-purple-500" size={18} />
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              placeholder="e.g., Develop user authentication module"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          {/* Assigned By */}
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline-block mr-2 text-purple-500" size={18} />
              Assigned By
            </label>
            <input
              type="text"
              id="assignedTo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              placeholder="e.g., Project Manager"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block mr-2 text-purple-500" size={18} />
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block mr-2 text-purple-500" size={18} />
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline-block mr-2 text-purple-500" size={18} />
              Duration
            </label>
            <input
              type="text"
              id="duration"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              placeholder="e.g., 5 days, 2 weeks"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="inline-block mr-2 text-purple-500" size={18} />
              Upload Attachments (Optional)
            </label>
            <button
              type="button"
              onClick={handleUploadClick}
              className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
            >
              Choose File(s)
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Max file size: 5MB. Allowed formats: PDF, JPG, PNG.
            </p>
          </div>

          {/* Description - now spans full width */}
          <div className="md:col-span-2">
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline-block mr-2 text-purple-500" size={18} />
              Task Description
            </label>
            <textarea
              id="taskDescription"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              rows="4"
              placeholder="Provide a detailed description of the task..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Status Selector - now spans full width */}
          <div className="md:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              <Send className="inline-block mr-2 text-purple-500" size={18} />
              Initial Status
            </label>
            <select
              id="status"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2"> {/* Submit button spans full width */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
            >
              Submit Task
            </button>
          </div>
        </form>

        {/* Task Summary */}
        {submittedTask && (
          <div className="mt-10 bg-white rounded-xl shadow-md p-6 space-y-4 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Task Summary</h2>
            <p><strong>Task Name:</strong> {submittedTask.name}</p>
            <p><strong>Assigned By:</strong> {submittedTask.assignedTo}</p>
            <p><strong>Start Date:</strong> {submittedTask.startDate}</p>
            <p><strong>Due Date:</strong> {submittedTask.dueDate}</p>
            <p><strong>Duration:</strong> {submittedTask.duration || 'N/A'}</p>
            <p><strong>Status:</strong> {submittedTask.status}</p>
            <p><strong>Description:</strong> {submittedTask.description || 'No description provided.'}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center mb-4">
              <Info className="text-blue-500 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Notification</h3>
            </div>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={hideMessageBox}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskAssigned;
