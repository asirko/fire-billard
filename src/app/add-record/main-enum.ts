export const VALUES = [
  { code: 'casse', label: 'Je casse' },
  { code: 'reprise', label: 'Je reprend la main' }
];

export function getByCode(code) {
  return VALUES.find((elem) => elem.code === code);
}
