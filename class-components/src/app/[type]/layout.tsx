import { ReactNode } from 'react';
import MainLayout from '../../components/MainLayout';

export default function MLayout({
  children,
  singleCard,
}: {
  children: ReactNode;
  singleCard: ReactNode;
}) {
  return (
    <MainLayout>
      {children}
      {singleCard}
    </MainLayout>
  );
}
