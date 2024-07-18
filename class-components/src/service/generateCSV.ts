import { Data } from '../types';

// function prepareHeader(data: Data[], header: (keyof Data)[]) {
//   header.map((el) => {
//     if (data[el])
//   })
// }

export default function generateCSV(data: Data[]) {
  const header = `${Object.keys(data[0]).join(',')}\n`;
  const rows = data
    .map((row) => {
      const values = Object.values(row);
      const result = values.map((value) => {
        if (Array.isArray(value)) {
          return value.join(' ');
        }
        if (typeof value === 'string' && value.includes(',')) {
          return value.replaceAll(',', ';');
        }
        return value;
      });
      return result.join(',');
    })
    .join('\n');
  return header + rows;
}
