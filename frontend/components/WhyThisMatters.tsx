'use client';

export default function WhyThisMatters() {
  const points = [
    {
      icon: '📡',
      title: 'Real-time situational awareness',
      desc: 'Airlines, airports, and governments track thousands of flights simultaneously. A single data gap can cascade into delays, diversions, or safety incidents.',
    },
    {
      icon: '💰',
      title: 'Economic scale',
      desc: 'Global aviation moves $900B in cargo annually. Route density data directly informs fuel pricing, slot allocation, and infrastructure investment decisions.',
    },
    {
      icon: '🛡',
      title: 'Security and anomaly detection',
      desc: 'Sudden altitude drops, unexpected route changes, or squawk 7700 signals trigger immediate response protocols across military and civilian agencies.',
    },
    {
      icon: '🌍',
      title: 'Climate and emissions tracking',
      desc: 'Flight paths and altitudes determine contrail formation and CO₂ impact. Intelligence layers on top of ADS-B data are now used by climate researchers.',
    },
  ];

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>💡 Why This Matters</div>
        <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
          For everyday viewers, builders, and allocators
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {points.map(p => (
          <div key={p.title} style={{
            display: 'flex', gap: 12, padding: '10px 12px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}