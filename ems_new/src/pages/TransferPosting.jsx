import React, { useState } from 'react';
import { User, Briefcase, MapPin, Calendar, FileText, Send, Info, Smartphone, CreditCard } from 'lucide-react'; // Added Smartphone and CreditCard icons

function TransferPosting() {
  // State variables for employee form inputs
  const [employeeName, setEmployeeName] = useState('');
  // Removed employeeId state
  const [cnic, setCnic] = useState(''); // New state for CNIC
  const [mobileNumber, setMobileNumber] = useState(''); // New state for Mobile Number
  const [designation, setDesignation] = useState(''); // New state for Designation
  const [dateOfBirth, setDateOfBirth] = useState(''); // New state for Date of Birth
  const [dateOfAppointment, setDateOfAppointment] = useState(''); // New state for Date of Appointment
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentPostingStartDate, setCurrentPostingStartDate] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [effectiveTransferDate, setEffectiveTransferDate] = useState('');
  const [reasonForTransfer, setReasonForTransfer] = useState('');

  // State for custom message modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // State to store submitted transfer requests
  const [submittedRequests, setSubmittedRequests] = useState([]);

  // Function to show the custom message modal
  const showMessageBox = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  // Function to hide the custom message modal
  const hideMessageBox = () => {
    setShowModal(false);
    setModalMessage('');
  };

  // Mock data for dropdowns (can be fetched from an API in a real application)
  const departments = ['Human Resources', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'];
  const positions = ['Manager', 'Developer', 'Analyst', 'Specialist', 'Coordinator', 'Director'];
  const locations = ['New York', 'London', 'Berlin', 'Paris', 'Tokyo', 'Sydney'];
  const designations = ['Software Engineer', 'Product Manager', 'HR Specialist', 'Sales Executive', 'Financial Analyst', 'Operations Coordinator']; // Mock designations

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const newTransferRequest = {
      id: Date.now(), // Unique ID for the request
      employeeName,
      // Removed employeeId from the object
      cnic,
      mobileNumber,
      designation,
      dateOfBirth,
      dateOfAppointment,
      currentDepartment,
      currentPosition,
      currentLocation,
      currentPostingStartDate,
      newDepartment,
      newPosition,
      newLocation,
      effectiveTransferDate,
      reasonForTransfer,
      status: 'Pending', // Default status for a new request
    };

    setSubmittedRequests((prevRequests) => [...prevRequests, newTransferRequest]);

    showMessageBox(`Transfer request for ${employeeName} has been submitted successfully to ${newDepartment} at ${newLocation} effective ${effectiveTransferDate}. Status: Pending.`);

    // Reset form fields after submission
    setEmployeeName('');
    // Removed employeeId reset
    setCnic('');
    setMobileNumber('');
    setDesignation('');
    setDateOfBirth('');
    setDateOfAppointment('');
    setCurrentDepartment('');
    setCurrentPosition('');
    setCurrentLocation('');
    setCurrentPostingStartDate('');
    setNewDepartment('');
    setNewPosition('');
    setNewLocation('');
    setEffectiveTransferDate('');
    setReasonForTransfer('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 font-inter">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Transfer Posting</h1>
          <p className="text-lg text-gray-600">Submit a request for an employee transfer.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Information */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Employee Details</h2>
          </div>
          <div>
            <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline-block mr-2 text-teal-500" size={18} />
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              placeholder="e.g., Jane Doe"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          {/* Removed Employee ID field */}
          {/* <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline-block mr-2 text-teal-500" size={18} />
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              placeholder="e.g., EMP12345"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div> */}
          {/* New Fields */}
          <div>
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="inline-block mr-2 text-teal-500" size={18} />
              CNIC
            </label>
            <input
              type="text"
              id="cnic"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              placeholder="e.g., 12345-6789012-3"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <Smartphone className="inline-block mr-2 text-teal-500" size={18} />
              Mobile Number
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="mobileNumber"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              placeholder="e.g., +1234567890"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div> {/* Changed to a single column for better layout with other fields */}
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline-block mr-2 text-teal-500" size={18} />
              Designation
            </label>
            <select
              id="designation"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              {designations.map((desig) => (
                <option key={desig} value={desig}>{desig}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block mr-2 text-teal-500" size={18} />
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dateOfAppointment" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block mr-2 text-teal-500" size={18} />
              Date of Appointment
            </label>
            <input
              type="date"
              id="dateOfAppointment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              value={dateOfAppointment}
              onChange={(e) => setDateOfAppointment(e.target.value)}
              required
            />
          </div>


          {/* Current Posting Details */}
          <div className="md:col-span-2 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Current Posting</h2>
          </div>
          <div>
            <label htmlFor="currentDepartment" className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline-block mr-2 text-teal-500" size={18} />
              Current Department
            </label>
            <select
              id="currentDepartment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={currentDepartment}
              onChange={(e) => setCurrentDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline-block mr-2 text-teal-500" size={18} />
              Current Position
            </label>
            <select
              id="currentPosition"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
              required
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline-block mr-2 text-teal-500" size={18} />
              Current Location
            </label>
            <select
              id="currentLocation"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="currentPostingStartDate" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block mr-2 text-teal-500" size={18} />
              Current Posting Start Date
            </label>
            <input
              type="date"
              id="currentPostingStartDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              value={currentPostingStartDate}
              onChange={(e) => setCurrentPostingStartDate(e.target.value)}
              required
            />
          </div>

          {/* New Posting Details */}
          <div className="md:col-span-2 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">New Posting Details</h2>
          </div>
          <div>
            <label htmlFor="newDepartment" className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline-block mr-2 text-teal-500" size={18} />
              New Department
            </label>
            <select
              id="newDepartment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              required
            >
              <option value="">Select New Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="newPosition" className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline-block mr-2 text-teal-500" size={18} />
              New Position
            </label>
            <select
              id="newPosition"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              required
            >
              <option value="">Select New Position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="newLocation" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline-block mr-2 text-teal-500" size={18} />
              New Location
            </label>
            <select
              id="newLocation"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white appearance-none"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              required
            >
              <option value="">Select New Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="effectiveTransferDate" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block mr-2 text-teal-500" size={18} />
              Effective Transfer Date
            </label>
            <input
              type="date"
              id="effectiveTransferDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              value={effectiveTransferDate}
              onChange={(e) => setEffectiveTransferDate(e.target.value)}
              required
            />
          </div>

          {/* Reason for Transfer */}
          <div className="md:col-span-2 mt-6">
            <label htmlFor="reasonForTransfer" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline-block mr-2 text-teal-500" size={18} />
              Reason for Transfer
            </label>
            <textarea
              id="reasonForTransfer"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
              rows="4"
              placeholder="Provide a brief reason for the transfer..."
              value={reasonForTransfer}
              onChange={(e) => setReasonForTransfer(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Send className="inline-block mr-2" size={20} /> Submit Transfer Request
            </button>
          </div>
        </form>

        {/* Submitted Requests Table */}
        {submittedRequests.length > 0 && (
          <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b border-gray-200">
              Submitted Transfer Requests
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                    {/* Removed Employee ID column */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submittedRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.employeeName}</td>
                      {/* Removed Employee ID data cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.newDepartment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.newLocation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.effectiveTransferDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${request.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                          ${request.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                          ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        `}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Custom Message Modal */}
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

export default TransferPosting;
