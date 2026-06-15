'use client';

export default function WhoControlsTheRail() {
  const players = [
    { name: 'OpenSky Network', role: 'Raw ADS-B data',        type: 'Source',     color: '#34d399', desc: 'Community-driven receiver network. Free tier available. Powers the live feed in this dashboard.' },
    { name: 'ADS-B Exchange',  role: 'Unfiltered flight data', type: 'Source',     color: '#34d399', desc: 'No government filtering. Preferred by researchers for completeness. Military flights visible.' },
    { name: 'FlightAware',     role: 'Commercial aggregator',  type: 'Aggregator', color: '#38BDF8', desc: 'Paid API. Used by airlines and airports for operational decisions. Covers 10,000+ airports.' },
    { name: 'ICAO',            role: 'Global standards body',  type: 'Regulator',  color: '#818CF8', desc: 'Sets the rules. Every aircraft transponder follows ICAO standards. No data access without them.' },
    { name: 'EUROCONTROL',     role: 'European airspace',      type: 'Regulator',  color: '#818CF8', desc: 'Manages 11M+ flights/year across Europe. Publishes open datasets for research.' },
    { name: 'Airlines / OEMs', role: 'Data consumers',         type: 'Consumer',   color: '#fbbf24', desc: 'Buy intelligence from aggregators. Use it for fuel planning, crew scheduling, delay prediction.' },
  ];

  const typeBg: Record<string, string> = {
    Source:     'rgba(52,211,153,0.08)',
    Aggregator: 'rgba(56,189,248,0.08)',
    Regulator:  'rgba(129,140,248,0.08)',
    Consumer:   'rgba(251,191,36,0.08)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {players.map(p => (
        <div key={p.name} style={{
          padding: '10px 12px',
          background: typeBg[p.type] || 'rgba(255,255,255,0.02)',
          border: `1px solid ${p.color}30`,
          borderRadius: 8,
          width: '100%',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.name}</div>
            <span style={{
              fontSize: 9,
              padding: '2px 7px',
              borderRadius: 999,
              background: `${p.color}20`,
              color: p.color,
              fontWeight: 700,
              flexShrink: 0,
              marginLeft: 6,
            }}>{p.type}</span>
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3 }}>{p.role}</div>
          <div style={{ fontSize: 10, color: '#475569', lineHeight: 1.5 }}>{p.desc}</div>
        </div>
      ))}
    </div>
  );
}