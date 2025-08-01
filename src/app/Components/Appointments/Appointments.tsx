import { useEffect, useState } from 'react';
import Image from 'next/image';
import LineChart from '../Charts/LineCharts';
import PieChartStatus from '../Charts/PieChartStatus';
import AppointmentHeatmapCalendar from './AppointmentHeatmapCalendar';

type Appointment = {
  status?: string;
  // Add more fields as needed
};

// Utility function to fetch appointments for a clinic from the backend
async function fetchClinicAppointments(token: string, clinicId: string, params: Record<string, string | number> = {}): Promise<any> {
  const BASE_URL = `https://docwo-api.onrender.com/api/v1/clinics/${clinicId}/appointments`;
  const url = new URL(BASE_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch clinic appointments');
  return res.json();
}

// Utility function to fetch doctors for a clinic
async function fetchClinicDoctors(token: string, clinicId: string, params: Record<string, string | number> = {}): Promise<any> {
  const BASE_URL = `https://docwo-api.onrender.com/api/v1/clinics/${clinicId}/doctors`;
  const url = new URL(BASE_URL);
  // Always set limit and page as in Swagger
  url.searchParams.set('limit', params.limit?.toString() || '10');
  url.searchParams.set('page', params.page?.toString() || '1');
  const fullUrl = url.toString();
  console.log('Fetching doctors from:', fullUrl);
  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
  let json;
  try {
    json = await res.json();
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    throw e;
  }
  if (!res.ok) {
    console.error('Error fetching doctors:', res.status, json);
    throw new Error('Failed to fetch clinic doctors');
  }
  console.log('Doctors API response:', json);
  return json;
}

// Dummy function: Replace with your actual auth token retrieval logic
function getAccessToken(): string {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImVtYWlsIjoiYWJjZEBlZmdoLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTc1MzA3MDg3NiwiZXhwIjoxNzUzMTU3Mjc2fQ.O3aD93L5EL6E3eqgTdmrW2RxfUNCpvWhnC5nM6xhYxc';
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState([
    { label: 'Total Appointments', value: '-', change: 0, changeText: '' },
    { label: 'Avg Consultation Time', value: '-', change: 0, changeText: '' },
    { label: 'Cancelled Appointments', value: '-', change: 0, changeText: '' },
    { label: 'Completed Appointments', value: '-', change: 0, changeText: '' },
    { label: 'Cancellation Rate', value: '-', change: 0, changeText: '' },
    { label: 'Completion Rate', value: '-', change: 0, changeText: '' },
  ]);
  const [doctors, setDoctors] = useState<{ doctor_id: string; users: { first_name: string; last_name: string } }[]>([]);

  useEffect(() => {
    async function loadAppointments() {
      setLoading(true);
      setError('');
      try {
        const token = getAccessToken();
        if (!token) throw new Error('Not authenticated');
        const clinicId = '1'; // TODO: Replace with dynamic clinicId if needed
        const data = await fetchClinicAppointments(token, clinicId, {
          sortBy: 'booking_timestamp:desc',
          limit: 100,
          page: 1,
        });
        console.log('Clinic Appointments API response:', data);
        console.log('Raw API response:', data);
        console.log('Appointments array:', data.data);
        console.log('Appointments count:', data.data ? data.data.length : 0);
        const appts: Appointment[] = data.data || [];
        console.log('Fetched appointments count:', appts.length);
        setAppointments(appts);
        // Compute stats
        const total = appts.length;
        const completed = appts.filter((a) => a.status === 'completed').length;
        const cancelled = appts.filter((a) => a.status && a.status.includes('cancelled')).length;
        const avgConsultTime = '-'; // Placeholder, depends on backend data
        const cancellationRate = total ? ((cancelled / total) * 100).toFixed(1) + '%' : '-';
        const completionRate = total ? ((completed / total) * 100).toFixed(1) + '%' : '-';
        setStats([
          { label: 'Total Appointments', value: String(total), change: 0, changeText: '' },
          { label: 'Avg Consultation Time', value: avgConsultTime, change: 0, changeText: '' },
          { label: 'Cancelled Appointments', value: String(cancelled), change: 0, changeText: '' },
          { label: 'Completed Appointments', value: String(completed), change: 0, changeText: '' },
          { label: 'Cancellation Rate', value: cancellationRate, change: 0, changeText: '' },
          { label: 'Completion Rate', value: completionRate, change: 0, changeText: '' },
        ]);
      } catch (err) {
        setError((err as Error).message || 'Error loading appointments');
      } finally {
        setLoading(false);
      }
    }
    loadAppointments();
  }, []);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const token = getAccessToken();
        const clinicId = '1';
        const data = await fetchClinicDoctors(token, clinicId, { limit: 100 });
        // Assume data.data is the array of doctors
        setDoctors(data.data || []);
        console.log(doctors)
      } catch (err) {
        // Optionally handle error
        setDoctors([]);
      }
    }
    loadDoctors();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Appointment Analytics</h1>
          <p className="text-gray-900 text-sm">Comprehensive insights for your appointment management</p>
        </div>
        <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium gap-2">
          <Image src="/export.svg" alt="Export" width={18} height={18} />
          Export Data
        </button>
      </div>

      {loading && <div className="my-8 text-center text-gray-500">Loading appointments...</div>}
      {error && <div className="my-8 text-center text-red-500">{error}</div>}

      {/* Filters (static for now) */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200 mt-10">
        <span className="block text-xs font-semibold text-black-500 mb-4">Filters</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black-500 mb-1" htmlFor="time-period">Time Period</label>
            <select id="time-period" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none font-semibold text-xs border-none w-fit">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black-500 mb-1 " htmlFor="doctor">Doctor</label>
            <select id="doctor" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none font-semibold text-xs border-none w-fit">
              <option>All Doctors</option>
              {doctors.map((doc) => (
                <option key={doc.doctor_id} value={doc.doctor_id}>
                  {doc.users?.first_name} {doc.users?.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black-500 mb-1" htmlFor="source">Source</label>
            <select id="source" className="border  px-3 py-2 text-gray-700 focus:outline-none font-semibold text-xs border-none w-fit">
              <option>App</option>
              <option>Website</option>
              <option>Clinic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => {
          const isPositive = stat.change >= 0;
          return (
            <div key={stat.label} className={"bg-white rounded-sm p-4 shadow flex flex-col gap-2 border border-gray-200"}>
              <span className="text-xs font-semibold text-black-500">{stat.label}</span>
              <span className="text-2xl font-bold mt-5 text-black-500">{stat.value}</span>
              {stat.changeText && (
                <span className={`text-xs flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <Image src={isPositive ? '/in‌crement.svg' : '/decrement.svg'} alt={isPositive ? 'Up' : 'Down'} width={14} height={14} />
                  {stat.changeText}
                </span>
              )}
            </div>
          );
        })}
      </div>

      

      {/* Analytics Section (static for now) */}
      <div className="rounded-md p-2 mb-6">
        <div className="text-center text-gray-700 font-medium mb-2 bg-gray-200 rounded-sm">Analytics</div>
        <div className="bg-white rounded-xl p-4 mb-6 shadow border border-gray-200 pb-10">
          <div className="font-medium mb-2">Appointments Trends Over Time</div>
          <LineChart appointments={appointments} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <div className="font-medium mb-2">Appointment status</div>
          <PieChartStatus appointments={appointments} />
        </div>
        <div className="bg-white rounded-xl p-6 mb-8 shadow border border-gray-200">
        <AppointmentHeatmapCalendar />
      </div>
      </div>
    </div>
  );
}


