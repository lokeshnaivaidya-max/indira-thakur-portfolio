'use client';

import { motion } from 'framer-motion';
import { HiPhoto, HiCalendarDays, HiUserGroup, HiEnvelope } from 'react-icons/hi2';

const stats = [
  { label: 'Gallery Images', value: '24', icon: HiPhoto, change: '+3 this month' },
  { label: 'Active Bookings', value: '8', icon: HiCalendarDays, change: '+2 this week' },
  { label: 'Testimonials', value: '12', icon: HiUserGroup, change: '+1 this month' },
  { label: 'New Messages', value: '5', icon: HiEnvelope, change: '3 unread' },
];

const recentBookings = [
  { name: 'Priya Sharma', service: 'Newborn Session', date: 'Aug 15, 2026', status: 'confirmed' },
  { name: 'Ananya Patel', service: 'Maternity Session', date: 'Aug 20, 2026', status: 'pending' },
  { name: 'Rohan Kapoor', service: 'Family Portrait', date: 'Aug 25, 2026', status: 'confirmed' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Dashboard</h1>
      <p className="font-sans-alt text-sm text-earth-brown/60 mb-10">Welcome back! Here&apos;s an overview of your portfolio.</p>

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
              className="bg-soft-white rounded-sm border border-warm-cream/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-muted-gold" />
                <span className="font-sans-alt text-xs text-earth-brown/50">{stat.change}</span>
              </div>
              <p className="font-serif text-3xl text-warm-black">{stat.value}</p>
              <p className="font-sans-alt text-xs text-earth-brown/60 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden">
        <div className="p-6 border-b border-warm-cream/50">
          <h2 className="font-serif text-xl text-warm-black">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-cream/50">
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Client</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Service</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Date</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.name} className="border-b border-warm-cream/30 hover:bg-warm-ivory/50 transition-colors">
                  <td className="p-4 font-sans-alt text-sm text-warm-black">{booking.name}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{booking.service}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{booking.date}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 font-sans-alt text-xs rounded-full ${
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
