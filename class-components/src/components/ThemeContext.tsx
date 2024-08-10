import { createContext, ReactNode, useMemo, useState } from 'react';

export const ThemeContext = createContext<
  | { theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> }
  | undefined
>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider
      value={useMemo(() => ({ theme, setTheme }), [theme, setTheme])}
    >
      {children}
    </ThemeContext.Provider>
  );
}
