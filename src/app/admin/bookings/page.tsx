'use client';

const bookings = [
  { id: '1', client: 'Priya Sharma', email: 'priya@example.com', service: 'Newborn', date: 'Aug 15, 2026', status: 'confirmed' },
  { id: '2', client: 'Ananya Patel', email: 'ananya@example.com', service: 'Maternity', date: 'Aug 20, 2026', status: 'pending' },
  { id: '3', client: 'Rohan Kapoor', email: 'rohan@example.com', service: 'Portrait', date: 'Aug 25, 2026', status: 'confirmed' },
  { id: '4', client: 'Sunita Verma', email: 'sunita@example.com', service: 'Events', date: 'Sep 1, 2026', status: 'pending' },
];

export default function AdminBookingsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Bookings</h1>
      <p className="font-sans-alt text-sm text-earth-brown/60 mb-10">Manage session bookings and inquiries.</p>

      <div className="bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-cream/50 bg-warm-ivory/50">
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Client</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Email</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Service</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Date</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Status</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-warm-cream/30 hover:bg-warm-ivory/50 transition-colors">
                  <td className="p-4 font-serif text-sm text-warm-black">{booking.client}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{booking.email}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{booking.service}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{booking.date}</td>
                  <td className="p-4">
                    <select
                      defaultValue={booking.status}
                      className="font-sans-alt text-xs px-3 py-1.5 rounded-sm border border-warm-beige/30 bg-transparent text-earth-brown focus:border-muted-gold/60 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button className="font-sans-alt text-xs text-muted-gold hover:text-warm-gold transition-colors">
                      View Details
                    </button>
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
