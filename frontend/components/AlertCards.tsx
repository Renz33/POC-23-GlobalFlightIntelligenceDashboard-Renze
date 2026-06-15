'use client';

interface Alert {
  id: string;
  callsign: string;
  type: string;
  severity: string;
  airport: string;
  message: string;
  timestamp: string;
  source: string;
}

interface Props {
  alerts: Alert[];
}

export default function AlertCards({ alerts }: Props) {
  return (
    <div className="glass" style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>🚨 Active Alerts</span>
        
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`severity-bg-${alert.severity}`}
            style={{ padding: '10px 12px', borderRadius: 8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
                {alert.callsign}
              </span>
              <span className={`severity-${alert.severity}`} style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>
                {alert.severity}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{alert.type}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>{alert.message}</div>
            <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>
              {new Date(alert.timestamp).toLocaleTimeString()} · {alert.airport} · {alert.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}