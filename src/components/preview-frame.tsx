"use client";

import { forwardRef, type ReactNode } from "react";
import type { CustomSettings } from "@/lib/themes";

interface PreviewFrameProps {
  settings: CustomSettings;
  children: ReactNode;
}

export const PreviewFrame = forwardRef<HTMLDivElement, PreviewFrameProps>(
  function PreviewFrame({ settings, children }, ref) {
    const background = settings.customBackground ?? settings.theme.background;

    return (
      <div
        ref={ref}
        style={{
          background,
          padding: settings.padding,
          borderRadius: settings.borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: settings.shadow ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {children}
      </div>
    );
  }
);
