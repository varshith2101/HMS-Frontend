import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, Bed } from 'lucide-react';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { patientAPI, doctorAPI, appointmentAPI, bedAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    admittedPatients: 0,
    totalDoctors: 0,
    availableDoctors: 0,
    totalAppointments: 0,
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [patients, admittedPatients, doctors, availableDoctors, appointments, bedStats] =
        await Promise.all([
          patientAPI.getAll(),
          patientAPI.getAdmitted(),
          doctorAPI.getAll(),
          doctorAPI.getAvailable(),
          appointmentAPI.getAll(),
          bedAPI.getStats(),
        ]);

      setStats({
        totalPatients: patients.data.length,
        admittedPatients: admittedPatients.data.length,
        totalDoctors: doctors.data.length,
        availableDoctors: availableDoctors.data.length,
        totalAppointments: appointments.data.length,
        totalBeds: bedStats.data.totalBeds || 0,
        availableBeds: bedStats.data.availableBeds || 0,
        occupiedBeds: bedStats.data.occupiedBeds || 0,
      });

      // Sort by date and show all appointments
      const sortedAppointments = appointments.data.sort((a, b) =>
        new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );
      setRecentAppointments(sortedAppointments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 border-4 border-black shadow-neo-xl p-6">
        <h1 className="text-5xl font-black text-black uppercase tracking-tight">Dashboard</h1>
        <p className="text-lg font-bold text-black/80 mt-2">Hospital Management System Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Admitted Patients"
          value={stats.admittedPatients}
          icon={UserCheck}
          color="blue"
        />
        <StatCard
          title="Available Doctors"
          value={`${stats.availableDoctors}/${stats.totalDoctors}`}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Available Beds"
          value={`${stats.availableBeds}/${stats.totalBeds}`}
          icon={Bed}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-yellow-100 to-orange-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Recent Appointments</h2>
          {recentAppointments.length === 0 ? (
            <p className="text-gray-600">No appointments scheduled</p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-neo">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-yellow-100 border-4 border-black shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <div>
                    <p className="font-bold text-gray-900">
                      {appointment.patient?.name || 'N/A'}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      Dr. {appointment.doctor?.name || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-600">{appointment.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                    <span
                      className={`text-xs font-bold px-3 py-1 border-2 border-black ${
                        appointment.status === 'SCHEDULED'
                          ? 'bg-blue-400 text-black'
                          : appointment.status === 'COMPLETED'
                          ? 'bg-green-400 text-black'
                          : 'bg-red-400 text-black'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card bg-gradient-to-br from-lime-100 to-cyan-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Quick Stats</h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center bg-white border-4 border-black p-4 shadow-neo">
              <span className="font-bold text-gray-900 uppercase">Total Appointments</span>
              <span className="text-3xl font-black text-gray-900">{stats.totalAppointments}</span>
            </div>
            <div className="flex justify-between items-center bg-white border-4 border-black p-4 shadow-neo">
              <span className="font-bold text-gray-900 uppercase">Occupied Beds</span>
              <span className="text-3xl font-black text-gray-900">{stats.occupiedBeds}</span>
            </div>
            <div className="flex justify-between items-center bg-white border-4 border-black p-4 shadow-neo">
              <span className="font-bold text-gray-900 uppercase">Bed Occupancy Rate</span>
              <span className="text-3xl font-black text-gray-900">
                {stats.totalBeds > 0
                  ? Math.round((stats.occupiedBeds / stats.totalBeds) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
