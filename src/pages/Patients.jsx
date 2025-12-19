import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, UserPlus, UserMinus } from 'lucide-react';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { patientAPI } from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    phoneNumber: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientAPI.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientData = {
        ...formData,
        age: parseInt(formData.age),
        height: formData.height ? parseInt(formData.height) : null,
        weight: formData.weight ? parseInt(formData.weight) : null,
      };

      if (editingPatient) {
        await patientAPI.update(editingPatient.id, patientData);
      } else {
        await patientAPI.create(patientData);
      }

      fetchPatients();
      closeModal();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientAPI.delete(id);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleAdmit = async (id) => {
    const bedNumber = prompt('Enter bed number:');
    if (bedNumber) {
      try {
        await patientAPI.admit(id, bedNumber);
        fetchPatients();
      } catch (error) {
        console.error('Error admitting patient:', error);
        alert('Failed to admit patient. Bed may not be available.');
      }
    }
  };

  const handleDischarge = async (id) => {
    if (window.confirm('Are you sure you want to discharge this patient?')) {
      try {
        await patientAPI.discharge(id);
        fetchPatients();
      } catch (error) {
        console.error('Error discharging patient:', error);
      }
    }
  };

  const openModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        name: patient.name,
        age: patient.age,
        height: patient.height || '',
        weight: patient.weight || '',
        gender: patient.gender || '',
        phoneNumber: patient.phoneNumber || '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPatient(null);
    setFormData({
      name: '',
      age: '',
      height: '',
      weight: '',
      gender: '',
      phoneNumber: '',
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bed
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.gender || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.phoneNumber || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.isAdmitted
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {patient.isAdmitted ? 'Admitted' : 'Outpatient'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.bedNumber || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openModal(patient)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      {!patient.isAdmitted ? (
                        <button
                          onClick={() => handleAdmit(patient.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <UserPlus className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDischarge(patient.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <UserMinus className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(patient.id)}
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

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Name *</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Age *</label>
              <input
                type="number"
                required
                className="input-field"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Gender</label>
              <select
                className="input-field"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Height (cm)</label>
              <input
                type="number"
                className="input-field"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                className="input-field"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input
              type="tel"
              className="input-field"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingPatient ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Patients;
