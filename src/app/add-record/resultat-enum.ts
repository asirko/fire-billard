export const CODE_FERME = 'ferme';
export const VALUES = [
  { code: 'perdu', label: 'Perdu' },
  { code: 'gagne', label: 'Gagné' },
  { code: 'ferme', label: 'Fermé' }
];

export function getByCode(code) {
  return VALUES.find((elem) => elem.code === code);
}
