import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { appointmentAPI, doctorAPI, patientAPI } from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    appointmentDate: '',
    reason: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
        appointmentAPI.getAll(),
        doctorAPI.getAll(),
        patientAPI.getAll(),
      ]);
      setAppointments(appointmentsRes.data);
      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
        reason: formData.reason,
      };

      await appointmentAPI.create(
        parseInt(formData.doctorId),
        parseInt(formData.patientId),
        appointmentData
      );

      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment. Please check if doctor and patient are available.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await appointmentAPI.updateStatus(id, status);
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      doctorId: '',
      patientId: '',
      appointmentDate: '',
      reason: '',
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.patient?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Dr. {appointment.doctor?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {appointment.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'SCHEDULED'
                          ? 'bg-blue-100 text-blue-800'
                          : appointment.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {appointment.status === 'SCHEDULED' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(appointment.id, 'COMPLETED')}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Completed"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(appointment.id, 'CANCELLED')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel Appointment"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title="Schedule New Appointment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Patient *</label>
            <select
              required
              className="input-field"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Doctor *</label>
            <select
              required
              className="input-field"
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Appointment Date & Time *</label>
            <input
              type="datetime-local"
              required
              className="input-field"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Reason *</label>
            <textarea
              required
              className="input-field"
              rows="3"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Reason for appointment"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
