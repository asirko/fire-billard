export const CODE_CASSE = 'casse';
export const CODE_REPRISE = 'reprise';

export const VALUES = [
  { code: CODE_CASSE, label: 'Casse' },
  { code: CODE_REPRISE, label: 'Reprise' }
];

export function getByCode(code) {
  return VALUES.find((elem) => elem.code === code);
}
