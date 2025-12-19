import React, { useState, useEffect } from 'react';
import { Plus, UserPlus, UserMinus } from 'lucide-react';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import StatCard from '../components/StatCard';
import { bedAPI, patientAPI } from '../services/api';
import { Bed } from 'lucide-react';

const Beds = () => {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
    occupancyRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [formData, setFormData] = useState({
    bedNumber: '',
    wardName: '',
    bedType: '',
  });
  const [allocateData, setAllocateData] = useState({
    patientId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bedsRes, statsRes, patientsRes] = await Promise.all([
        bedAPI.getAll(),
        bedAPI.getStats(),
        patientAPI.getAll(),
      ]);

      setBeds(bedsRes.data);
      setStats(statsRes.data);
      setPatients(patientsRes.data.filter((p) => !p.isAdmitted));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bedAPI.create(formData);
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error creating bed:', error);
    }
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    try {
      await bedAPI.allocate(selectedBed.bedNumber, parseInt(allocateData.patientId));
      fetchData();
      closeAllocateModal();
    } catch (error) {
      console.error('Error allocating bed:', error);
      alert('Failed to allocate bed. The bed may already be occupied.');
    }
  };

  const handleRelease = async (bedNumber) => {
    if (window.confirm('Are you sure you want to release this bed?')) {
      try {
        await bedAPI.release(bedNumber);
        fetchData();
      } catch (error) {
        console.error('Error releasing bed:', error);
      }
    }
  };

  const openAllocateModal = (bed) => {
    setSelectedBed(bed);
    setShowAllocateModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      bedNumber: '',
      wardName: '',
      bedType: '',
    });
  };

  const closeAllocateModal = () => {
    setShowAllocateModal(false);
    setSelectedBed(null);
    setAllocateData({
      patientId: '',
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Bed Availability</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Bed</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Beds"
          value={stats.totalBeds || 0}
          icon={Bed}
          color="primary"
        />
        <StatCard
          title="Available Beds"
          value={stats.availableBeds || 0}
          icon={Bed}
          color="green"
        />
        <StatCard
          title="Occupied Beds"
          value={stats.occupiedBeds || 0}
          icon={Bed}
          color="red"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate ? Math.round(stats.occupancyRate) : 0}%`}
          icon={Bed}
          color="yellow"
        />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bed Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bed Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
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
              {beds.map((bed) => (
                <tr key={bed.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bed.bedNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.wardName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.bedType || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.patient?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bed.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {bed.isAvailable ? 'Available' : 'Occupied'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {bed.isAvailable ? (
                        <button
                          onClick={() => openAllocateModal(bed)}
                          className="text-green-600 hover:text-green-900"
                          title="Allocate Bed"
                        >
                          <UserPlus className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRelease(bed.bedNumber)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Release Bed"
                        >
                          <UserMinus className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title="Add New Bed">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Bed Number *</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.bedNumber}
              onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Ward Name</label>
            <input
              type="text"
              className="input-field"
              value={formData.wardName}
              onChange={(e) => setFormData({ ...formData, wardName: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Bed Type</label>
            <select
              className="input-field"
              value={formData.bedType}
              onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Private">Private</option>
              <option value="Semi-Private">Semi-Private</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAllocateModal} onClose={closeAllocateModal} title="Allocate Bed">
        <form onSubmit={handleAllocate} className="space-y-4">
          <div>
            <label className="label">Bed Number</label>
            <input
              type="text"
              disabled
              className="input-field bg-gray-100"
              value={selectedBed?.bedNumber || ''}
            />
          </div>
          <div>
            <label className="label">Select Patient *</label>
            <select
              required
              className="input-field"
              value={allocateData.patientId}
              onChange={(e) => setAllocateData({ ...allocateData, patientId: e.target.value })}
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={closeAllocateModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Allocate
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Beds;
