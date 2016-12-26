export const CODE_PERDU = 'perdu';
export const CODE_GAGNE = 'gagne';
export const CODE_FERME = 'ferme';

export const VALUES = [
  { code: CODE_PERDU, label: 'Perdu' },
  { code: CODE_GAGNE, label: 'Gagné' },
  { code: CODE_FERME, label: 'Fermé' }
];

export function getByCode(code) {
  return VALUES.find((elem) => elem.code === code);
}
