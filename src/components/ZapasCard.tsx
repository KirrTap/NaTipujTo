import React from 'react';
import { supabase } from '../supabaseClient';

const teamLogos: Record<string, string> = {
  'HC KE': 'https://www.hokejportal.net/hp/kluby/KOS.png?202508b',
  'HK SNV': 'https://www.hokejportal.net/hp/kluby/SNV.png?202508b',
  'HK NR': 'https://www.hokejportal.net/hp/kluby/NIT.png?202508b',
  'HC ZA': 'https://www.hokejportal.net/hp/kluby/ZIL.png?202508b',
  'HC BB': 'https://www.hokejportal.net/hp/kluby/BBY.png?202508b',
  'HK PP': 'https://www.hokejportal.net/hp/kluby/POP.png?202508b',
  'HC BA': 'https://www.hokejportal.net/hp/kluby/SBA.png?202508b',
  'HK TN': 'https://www.hokejportal.net/hp/kluby/TRE.png?202508b',
  'HK MI': 'https://www.hokejportal.net/hp/kluby/MIC.png?202508b',
  'HKM ZV': 'https://www.hokejportal.net/hp/kluby/ZVO.png?202508b',
  'HK LM': 'https://www.hokejportal.net/hp/kluby/LMI.png?202508b',
  'HC PO': 'https://www.hokejportal.net/hp/kluby/PRE.png?202508b'
};

interface ZapasCardProps {
  home_team: string;
  away_team: string;
  date: string; // ISO string
  match_id: number;
  username: string;
  onTip?: () => void;
};

const ZapasCard: React.FC<ZapasCardProps> = ({ home_team, away_team, date, match_id, username, onTip }) => {
  const [tipH, setTipH] = React.useState('');
  const [tipA, setTipA] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const formattedDate = new Date(date).toLocaleString('sk-SK', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const homeLogo = teamLogos[home_team] || '/images/default.png';
  const awayLogo = teamLogos[away_team] || '/images/default.png';

  const handleTip = async () => {
    if (!tipH || !tipA || isNaN(Number(tipH)) || isNaN(Number(tipA))) return;
    setLoading(true);
    await supabase.from('tips').insert({
      match_id,
      username,
      tip_h: Number(tipH),
      tip_a: Number(tipA),
      tiped_at: new Date().toISOString(),
      points: null
    });
    setLoading(false);
    setTipH('');
    setTipA('');
    if (onTip) onTip();
  };

  return (
    <div style={{
      maxWidth: 340,
      margin: '16px auto',
      border: '2px solid #1976d2ff',
      borderRadius: 16,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{formattedDate}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 110, gap: 6, justifyContent: 'center' }}>
          <div style={{ fontWeight: 500, fontSize: 14 }}>{home_team}</div>
          <img src={homeLogo} alt={home_team} style={{ width: 40, height: 40, objectFit: 'contain' }} />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                style={{ width: 36, padding: 4, fontSize: 15, textAlign: 'center', borderRadius: 6, border: '1px solid #bbb' }}
                value={tipH}
                onChange={e => setTipH(e.target.value.replace(/[^0-9]/g, ''))}
              />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }}>
          <span style={{ fontWeight: 600, fontSize: 22, display: 'inline-block', width: 18, textAlign: 'center' }}>:</span>
        </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 110, gap: 6, justifyContent: 'center' }}>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                style={{ width: 36, padding: 4, fontSize: 15, textAlign: 'center', borderRadius: 6, border: '1px solid #bbb' }}
                value={tipA}
                onChange={e => setTipA(e.target.value.replace(/[^0-9]/g, ''))}
              />
          <img src={awayLogo} alt={away_team} style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <div style={{ fontWeight: 500, fontSize: 14 }}>{away_team}</div>
        </div>
      </div>
          <button
            style={{ marginTop: 8, padding: '6px 16px', borderRadius: 7, background: '#1976d2', color: 'white', border: 'none', fontSize: 14, fontWeight: 600, cursor: loading ? 'wait' : 'pointer', minWidth: 70 }}
            onClick={handleTip}
            disabled={loading}
          >
            {loading ? 'Ukladám...' : 'Tip'}
          </button>
    </div>
  );
};

export default ZapasCard;