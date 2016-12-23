export const VALUES = [
  { code: 'casse', label: '1ère main' },
  { code: 'reprise', label: '2ème main' }
];

export function getByCode(code) {
  return VALUES.find((elem) => elem.code === code);
}
