import type { ReactNode } from "react";

export default function ThalesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full overflow-hidden dark">
      {children}
    </div>
  );
}
