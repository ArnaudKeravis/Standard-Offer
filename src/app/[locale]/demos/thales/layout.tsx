export default function ThalesDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden dark">
      {children}
    </div>
  );
}
