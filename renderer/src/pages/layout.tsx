import { cn } from '@/lib/cn';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn('antialiased bg-background w-screen h-screen flex flex-col')}>
      {children}
    </div>
  );
}
