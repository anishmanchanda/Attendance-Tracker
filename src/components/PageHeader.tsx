import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon, actions, className }) => {
  return (
    <header
      className={cn(
        "mb-6 rounded-xl border p-5 md:p-6 shadow-sm",
        "bg-gradient-to-r from-[hsl(var(--primary)/0.06)] to-[hsl(var(--primary-glow)/0.06)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] shadow-[var(--shadow-glow)]">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-semibold leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
};
