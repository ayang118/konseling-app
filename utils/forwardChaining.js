export const forwardChaining = (fakta, rules) => {
  let hasil = null;

  rules.forEach(rule => {
    const semuaCocok = rule.gejala.every(g =>
      fakta.map(Number).includes(Number(g))
    );

    if (semuaCocok) {
      hasil = rule.id_diagnosis;
    }
  });

  return { hasil };
};
