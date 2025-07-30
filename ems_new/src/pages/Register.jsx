
import React, { useState } from 'react';
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    confirmInfo: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.match(/^[a-zA-Z\s]+$/)) {
      newErrors.fullName = 'Name is required and must contain only letters and spaces.';
    }
    if (!formData.cnic.match(/^\d{5}-\d{7}-\d$/)) {
      newErrors.cnic = 'CNIC must be in format 4XXXX-XXXXXXX-X';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.mobile.match(/^03\d{9}$/)) {
      newErrors.mobile = 'Enter a valid mobile number starting with 03.';
    }
    if (formData.password.length < 8 || formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords must match and be at least 8 characters.';
    }
    if (!formData.confirmInfo) {
      newErrors.confirmInfo = 'You must confirm your information.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Registration submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Create Your Account</h1>
          <p className="text-gray-500 mb-6 text-center">Please fill in the details below to register.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">CNIC</label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="4XXXX-XXXXXXX-X"
                />
                {errors.cnic && <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="you@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="03XXXXXXXXX"
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>
            </div>
            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="Re-enter your password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>
            <div className="mb-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="confirmInfo"
                  checked={formData.confirmInfo}
                  onChange={handleInputChange}
                  className="mr-2 accent-blue-600"
                />
                <span className="text-gray-700">I confirm that all the information entered is correct.</span>
              </label>
              {errors.confirmInfo && <p className="text-red-500 text-sm mt-1">{errors.confirmInfo}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
            >
              Register
            </button>
          </form>
        </div>
      </main>
      <footer className="bg-white shadow py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© 2025 BBSHRRDB. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;