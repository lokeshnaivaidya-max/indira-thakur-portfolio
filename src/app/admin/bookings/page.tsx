'use client';

const bookings: { id: string; client: string; email: string; service: string; date: string; status: string }[] = [];

export default function AdminBookingsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Bookings</h1>
      <p className="font-sans text-sm text-warm-gray/60 mb-10">Manage session bookings and inquiries.</p>

      <div className="bg-white rounded-sm border border-cream/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/50 bg-ivory/50">
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Client</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Email</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Service</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Date</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Status</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-cream/30 hover:bg-ivory/50 transition-colors">
                  <td className="p-4 font-serif text-sm text-rich-black">{booking.client}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{booking.email}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{booking.service}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{booking.date}</td>
                  <td className="p-4">
                    <select
                      defaultValue={booking.status}
                      className="font-sans text-xs px-3 py-1.5 rounded-sm border border-warm-beige/30 bg-transparent text-warm-gray focus:border-magenta/60 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button className="font-sans text-xs text-magenta/60 hover:text-magenta transition-colors">
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
