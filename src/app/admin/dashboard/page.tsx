'use client';

import { motion } from 'framer-motion';
import { HiPhoto, HiCalendarDays, HiUserGroup, HiEnvelope } from 'react-icons/hi2';

const stats: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
}[] = [];

const recentBookings: { name: string; service: string; date: string; status: string }[] = [];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Dashboard</h1>
      <p className="font-sans text-sm text-warm-gray/60 mb-10">Welcome back! Here&apos;s an overview of your portfolio.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-sm border border-cream/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-magenta/60" />
                <span className="font-sans text-xs text-warm-gray/50">{stat.change}</span>
              </div>
              <p className="font-serif text-3xl text-rich-black">{stat.value}</p>
              <p className="font-sans text-xs text-warm-gray/60 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-sm border border-cream/50 overflow-hidden">
        <div className="p-6 border-b border-cream/50">
          <h2 className="font-serif text-xl text-rich-black">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/50">
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Client</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Service</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Date</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.name} className="border-b border-cream/30 hover:bg-ivory/50 transition-colors">
                  <td className="p-4 font-sans text-sm text-rich-black">{booking.name}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{booking.service}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{booking.date}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 font-sans text-xs rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
