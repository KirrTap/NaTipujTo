import React from 'react';

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

export interface PointsCardProps {
  id: number;
  home_team: string;
  away_team: string;
  date: string;
  tip_h: number;
  tip_a: number;
  points: number;
}

const PointsCard: React.FC<PointsCardProps> = ({
  id,
  home_team,
  away_team,
  date,
  tip_h,
  tip_a,
  points
}) => {
  const homeLogo = teamLogos[home_team] || '/images/default.png';
  const awayLogo = teamLogos[away_team] || '/images/default.png';
  const formattedDate = new Date(date).toLocaleString('sk-SK', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div style={{
      maxWidth: 340,
      margin: '16px auto',
      border: points === 0 ? '2px solid #d32f2f' : '2px solid #43a047',
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
            value={tip_h}
            style={{
              width: 32,
              padding: 4,
              fontSize: 16,
              textAlign: 'center',
              borderRadius: 6,
              border: '1px solid #bbb',
              background: '#eee',
            }}
            disabled
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }}>
          <span style={{ fontWeight: 600, fontSize: 22, display: 'inline-block', width: 18, textAlign: 'center' }}>:</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 110, gap: 6, justifyContent: 'center' }}>
          <input
            type="text"
            value={tip_a}
            style={{
              width: 32,
              padding: 4,
              fontSize: 16,
              textAlign: 'center',
              borderRadius: 6,
              border: '1px solid #bbb',
              background: '#eee',
            }}
            disabled
          />
          <img src={awayLogo} alt={away_team} style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <div style={{ fontWeight: 500, fontSize: 14 }}>{away_team}</div>
        </div>
      </div>
      <div style={{
        marginTop: 12,
        background: points === 0 ? '#d32f2f' : '#43a047',
        color: 'white',
        borderRadius: '50%',
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        {points}
      </div>
    </div>
  );
};

export default PointsCard;
