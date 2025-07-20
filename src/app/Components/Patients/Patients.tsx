"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface Patient {
  id: string;
  initials: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  lastVisit: string;
  visits: number;
  doctor: string;
}

const mockPatients: Patient[] = [
  {
    id: 'DCW1234',
    initials: 'SJ',
    name: 'Lorem Ipsum',
    age: 12,
    gender: 'M',
    bloodGroup: 'A+',
    phone: '+91 12345 12345',
    email: 'loremipsum@gmail.com',
    lastVisit: '15-01-2026',
    visits: 1,
    doctor: 'Dr. Ajmal'
  },
  {
    id: 'DCW1235',
    initials: 'MC',
    name: 'Lorem Ipsum',
    age: 25,
    gender: 'F',
    bloodGroup: 'AB+',
    phone: '+91 12345 12346',
    email: 'loremipsum2@gmail.com',
    lastVisit: '14-01-2026',
    visits: 4,
    doctor: 'Dr. Ajmal'
  },
  {
    id: 'DCW1236',
    initials: 'RD',
    name: 'Lorem Ipsum',
    age: 30,
    gender: 'M',
    bloodGroup: 'O-',
    phone: '+91 12345 12347',
    email: 'loremipsum3@gmail.com',
    lastVisit: '13-01-2026',
    visits: 2,
    doctor: 'Dr. Ajmal'
  },
  {
    id: 'DCW1237',
    initials: 'SJ',
    name: 'Lorem Ipsum',
    age: 39,
    gender: 'F',
    bloodGroup: 'B-',
    phone: '+91 12345 54321',
    email: 'loremipsum2025@gmail.com',
    lastVisit: '12-12-2025',
    visits: 3,
    doctor: 'Dr. Ajmal'
  }
];

export default function Patients() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    gender: '',
    age: ''
  });

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatients(prev =>
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map(p => p.id));
    }
  };

  const clearSelection = () => {
    setSelectedPatients([]);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">All Patients</h1>
          <p className="text-sm text-black mt-1">Manage and view all patient records</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-white bg-black rounded-sm transition-transform duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="text-black px-4 py-1 rounded-lg flex items-center space-x-2 border border-grey-200 transition-transform duration-300 hover:bg-gray-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Patient</span>
          </button>
          <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium gap-2">
            <Image src="/Export.svg" alt="Export" width={18} height={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 border border-gray-200 p-8 rounded-sm">
        <div className="flex-1 relative border-none group flex items-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 flex items-center pointer-events-none h-full">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder=" "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2  bg-white text-gray-900 focus:outline-none border-b-2 border-transparent focus:border-[#07613d] transition-colors duration-300 peer align-middle"
          />
          <label className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none transition-all duration-300 peer-focus:left-10 peer-focus:-translate-y-6 peer-focus:text-[#07613d] peer-focus:text-sm peer-placeholder-shown:left-10 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base">
            Search by name, ID, or phone ...
          </label>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#07613d] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium gap-2  transition-transform duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span>Filters</span>
        </button>
        <div className="flex bg-black rounded-sm border border-gray-200">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2  ${
              viewMode === 'table'
                ? 'text-white hover:text-gray-300'
                : 'bg-white text-black'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${
              viewMode === 'grid'
                ? 'text-white hover:text-gray-300'
                : 'bg-white text-black'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Bar (inline, compact) */}
      {showFilters && (
        <div className="flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-md px-1 py-1 absolute right-40  top-50 mt-2 z-10 shadow" style={{ minWidth: '300px', height: '36px' }}>
          <select
            value={filters.location}
            onChange={e => handleFilterChange('location', e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm h-7"
          >
            <option value="">Location</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
          <select
            value={filters.gender}
            onChange={e => handleFilterChange('gender', e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm h-7"
          >
            <option value="">Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <select
            value={filters.age}
            onChange={e => handleFilterChange('age', e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm h-7"
          >
            <option value="">Age</option>
            <option value="0-18">0-18</option>
            <option value="19-30">19-30</option>
            <option value="31-50">31-50</option>
            <option value="51-70">51-70</option>
            <option value="70+">70+</option>
          </select>
        </div>
      )}

      {/* Results Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Patients ({filteredPatients.length})</h2>
        {selectedPatients.length > 0 && (
          <button
            onClick={clearSelection}
            className="text-[#07613d] hover:text-[#054a2e] font-medium"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#07613d] focus:ring-[#07613d]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Visit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={() => handleSelectPatient(patient.id)}
                        className="rounded border-gray-300 text-[#07613d] focus:ring-[#07613d]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                            {patient.initials}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}/{patient.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.phone}</div>
                      <div className="text-sm text-gray-500">{patient.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.lastVisit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.visits}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <input
                  type="checkbox"
                  checked={selectedPatients.includes(patient.id)}
                  onChange={() => handleSelectPatient(patient.id)}
                  className="rounded border-gray-300 text-[#07613d] focus:ring-[#07613d]"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{patient.initials}</span>
                  <span className="text-sm text-gray-900">{patient.name}</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-2">{patient.id}</div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Age/Gender:</span>
                  <span className="text-sm text-gray-900">{patient.age}/{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Blood Group:</span>
                  <span className="text-sm text-gray-900">{patient.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Visit:</span>
                  <span className="text-sm text-gray-900">{patient.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Doctor:</span>
                  <span className="text-sm text-gray-900">{patient.doctor}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{patient.email}</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{patient.phone}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


