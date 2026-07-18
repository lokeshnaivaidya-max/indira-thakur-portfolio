'use client';

const messages: any[] = [];

export default function AdminContactPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Contact Messages</h1>
      <p className="font-sans text-sm text-warm-gray/60 mb-10">View and manage contact form submissions.</p>

      <div className="bg-white rounded-sm border border-cream/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream/50 bg-ivory/50">
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Name</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Email</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Subject</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Date</th>
                <th className="text-left p-4 font-sans text-xs tracking-wider uppercase text-warm-gray/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className={`border-b border-cream/30 hover:bg-ivory/50 transition-colors ${!msg.read ? 'bg-magenta/5' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-magenta/60" />}
                      <span className="font-serif text-sm text-rich-black">{msg.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{msg.email}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{msg.subject}</td>
                  <td className="p-4 font-sans text-sm text-warm-gray/70">{msg.date}</td>
                  <td className="p-4">
                    <span className={`font-sans text-xs px-3 py-1 rounded-sm ${msg.read ? 'bg-cream/50 text-warm-gray/60' : 'bg-magenta/60/10 text-magenta/60'}`}>
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
