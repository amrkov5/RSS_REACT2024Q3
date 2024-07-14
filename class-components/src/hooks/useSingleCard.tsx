import { useOutletContext } from 'react-router-dom';

export default function useSingleCard() {
  return useOutletContext<{ link: string; name: string }>();
}
