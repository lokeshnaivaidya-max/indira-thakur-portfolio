'use client';

const messages = [
  { id: '1', name: 'Neha Singh', email: 'neha@example.com', subject: 'Newborn Session Inquiry', date: '2 days ago', read: false },
  { id: '2', name: 'Vikram Mehta', email: 'vikram@example.com', subject: 'Corporate Event', date: '3 days ago', read: false },
  { id: '3', name: 'Lakshmi Iyer', email: 'lakshmi@example.com', subject: 'Maternity Package', date: '5 days ago', read: true },
  { id: '4', name: 'Arjun Desai', email: 'arjun@example.com', subject: 'Portfolio Review', date: '1 week ago', read: true },
];

export default function AdminContactPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Contact Messages</h1>
      <p className="font-sans-alt text-sm text-earth-brown/60 mb-10">View and manage contact form submissions.</p>

      <div className="bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-cream/50 bg-warm-ivory/50">
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Name</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Email</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Subject</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Date</th>
                <th className="text-left p-4 font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className={`border-b border-warm-cream/30 hover:bg-warm-ivory/50 transition-colors ${!msg.read ? 'bg-warm-blush/10' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-muted-gold" />}
                      <span className="font-serif text-sm text-warm-black">{msg.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{msg.email}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{msg.subject}</td>
                  <td className="p-4 font-sans-alt text-sm text-earth-brown/70">{msg.date}</td>
                  <td className="p-4">
                    <span className={`font-sans-alt text-xs px-3 py-1 rounded-sm ${msg.read ? 'bg-cream/50 text-earth-brown/60' : 'bg-muted-gold/10 text-muted-gold'}`}>
                      {msg.read ? 'Read' : 'New'}
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
