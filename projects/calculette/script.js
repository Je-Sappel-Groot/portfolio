// Logique simple pour la calculatrice
const display = document.getElementById('display');
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.dataset.value;
    if (v === 'C') { display.value = ''; return; }
    if (v === '=') {
      try {
        const expr = display.value;
        if (!/^[0-9+\-*/().\s]+$/.test(expr)) throw 'erreur';
        // Évaluation simple
        display.value = String(eval(expr));
      } catch (e) {
        display.value = 'Erreur';
      }
      return;
    }
    // remplacer le symbole ÷ et × si collés depuis l'UI
    display.value += v;
  });
});
