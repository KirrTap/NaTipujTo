import { supabase } from '../supabaseClient';

/**
 * Vyhodnotí tipy pre daný zápas po uložení výsledku.
 * Ak tip presne sedí, pridelí 10 bodov do tips.points a pripočíta body do profiles.points.
 */
export async function evaluateTipsForMatch(matchId: number) {
  // 1. Načítaj výsledok zápasu
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('home_goals, away_goals')
    .eq('id', matchId)
    .single();
  if (matchError || !match) return;

  // 2. Načítaj všetky tipy na tento zápas
  const { data: tips, error: tipsError } = await supabase
    .from('tips')
    .select('id, username, tip_h, tip_a, points')
    .eq('match_id', matchId);
  if (tipsError || !tips) return;

    for (const tip of tips) {
      const tipHome = Number(tip.tip_h);
      const tipAway = Number(tip.tip_a);
      const resHome = Number(match.home_goals);
      const resAway = Number(match.away_goals);
      const tipDiff = tipHome - tipAway;
      const resDiff = resHome - resAway;
      const tipSum = tipHome + tipAway;
      const resSum = resHome + resAway;
      const tipWinner = tipHome > tipAway ? 'home' : tipHome < tipAway ? 'away' : 'draw';
      const resWinner = resHome > resAway ? 'home' : resHome < resAway ? 'away' : 'draw';
      if (tip.points !== null && tip.points !== undefined && tip.points !== 0) continue;
      // 1. Presný výsledok
      if (tipHome === resHome && tipAway === resAway) {
        await supabase
          .from('tips')
          .update({ points: 10 })
          .eq('id', tip.id);
        continue;
      }
      // 2. Trafí rozdiel alebo súčet a aj víťaza
      if ((tipDiff === resDiff || tipSum === resSum) && tipWinner === resWinner) {
        await supabase
          .from('tips')
          .update({ points: 6 })
          .eq('id', tip.id);
        continue;
      }
      // 3. Trafí len víťaza (bez rozdielu/súčtu)
      if (tipWinner === resWinner) {
        await supabase
          .from('tips')
          .update({ points: 4 })
          .eq('id', tip.id);
        continue;
      }
      // 4. Trafí len rozdiel alebo súčet (ale nie víťaza)
      if ((tipDiff === resDiff || tipSum === resSum)) {
        await supabase
          .from('tips')
          .update({ points: 2 })
          .eq('id', tip.id);
        continue;
      }
      // 5. Inak 0 bodov
      await supabase
        .from('tips')
        .update({ points: 0 })
        .eq('id', tip.id);
    }
}
