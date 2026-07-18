'use client';

import { useState } from 'react';
import { Gallery } from '@/components/admin/Gallery';
import { Dashboard } from '@/components/admin/Dashboard';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabClass = (tab: string) =>
    `py-4 px-6 border-b-2 font-medium text-sm ${
      activeTab === tab
        ? 'border-indigo-500 text-indigo-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={tabClass('dashboard')}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={tabClass('gallery')}
              >
                Gallery Management
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'gallery' && <Gallery />}
          </div>
        </div>
      </div>
    </div>
  );
}