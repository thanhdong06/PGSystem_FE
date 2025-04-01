import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';

// Main component for creating doctor appointment reminders
const DoctorAppointmentReminder = () => {
  // State for form data
  const [appointmentData, setAppointmentData] = useState({
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'Check-up',
    reminderTime: '1 day before',
    notes: '',
  });
  
  // State for doctors list (would typically come from an API)
  const [doctors, setDoctors] = useState([]);
  // State for tracking form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Effect to fetch doctors (simulated here)
  useEffect(() => {
    // In a real application, this would be an API call
    // Here we're simulating with mock data
    setTimeout(() => {
      setDoctors([
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Family Medicine' },
        { id: 3, name: 'Dr. Priya Patel', specialty: 'Pediatrics' },
        { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics' },
      ]);
    }, 500);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!appointmentData.doctorName) newErrors.doctorName = 'Please select a doctor';
    if (!appointmentData.appointmentDate) newErrors.appointmentDate = 'Please select a date';
    if (!appointmentData.appointmentTime) newErrors.appointmentTime = 'Please select a time';
    
    // Date validation - ensure it's not in the past
    if (appointmentData.appointmentDate) {
      const selectedDate = new Date(appointmentData.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.appointmentDate = 'Appointment date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate before proceeding
    if (!validateForm()) return;
    
    // In a real application, this would call an API to save the appointment
    console.log('Creating calendar reminder:', appointmentData);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setAppointmentData({
        doctorName: '',
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: 'Check-up',
        reminderTime: '1 day before',
        notes: '',
      });
    }, 3000);
  };

  // Appointment type options
  const appointmentTypes = [
    'Check-up',
    'pregnancy check-up schedule',
    'Procedure',
    'tests to be performed',
    'vaccination schedule',
    'Other'
  ];

  // Reminder time options
  const reminderOptions = [
    '15 minutes before',
    '30 minutes before',
    '1 hour before',
    '2 hours before',
    '1 day before',
    '2 days before',
    '1 week before'
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Calendar className="text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Create Doctor Appointment Reminder</h2>
      </div>

      {isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Appointment reminder created successfully!</p>
          <p>Your appointment with {appointmentData.doctorName} has been added to your calendar.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Doctor Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="doctorName">
              Select Doctor
            </label>
            <select
              id="doctorName"
              name="doctorName"
              value={appointmentData.doctorName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.doctorName ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">-- Select a doctor --</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
            {errors.doctorName && <p className="text-red-500 text-xs mt-1">{errors.doctorName}</p>}
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="appointmentDate">
                Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={appointmentData.appointmentDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.appointmentDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="appointmentTime">
                Time
              </label>
              <input
                type="time"
                id="appointmentTime"
                name="appointmentTime"
                value={appointmentData.appointmentTime}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.appointmentTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.appointmentTime && <p className="text-red-500 text-xs mt-1">{errors.appointmentTime}</p>}
            </div>
          </div>

          {/* Appointment Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="appointmentType">
              Appointment Type
            </label>
            <select
              id="appointmentType"
              name="appointmentType"
              value={appointmentData.appointmentType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {appointmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Reminder Time */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="reminderTime">
              <div className="flex items-center">
                <Bell className="text-blue-600 mr-2 h-4 w-4" />
                <span>Reminder Time</span>
              </div>
            </label>
            <select
              id="reminderTime"
              name="reminderTime"
              value={appointmentData.reminderTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {reminderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="notes">
              Additional Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={appointmentData.notes}
              onChange={handleInputChange}
              placeholder="Any preparation instructions or notes for your appointment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
          >
            <Clock className="mr-2 h-5 w-5" />
            Create Appointment Reminder
          </button>
        </form>
      )}
    </div>
  );
};

export default DoctorAppointmentReminder;