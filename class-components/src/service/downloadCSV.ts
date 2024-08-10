import generateCSV from './generateCSV';
import { Data } from '../types';

export default function downloadCSV(data: Data[], type: string) {
  const csv = generateCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.length}_${type}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
