export default function LenotreDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden">
      {children}
    </div>
  );
}
