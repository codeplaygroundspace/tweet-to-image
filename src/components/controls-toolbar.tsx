"use client";

import { useEffect, useRef, useState } from "react";
import { THEME_PRESETS, UI_COLORS, type CustomSettings, type ThemePreset } from "@/lib/themes";

const checkerboard = "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 8px 8px";

function ThemeDot({ preset, size = 16 }: { preset: ThemePreset; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: preset.id === "transparent" ? checkerboard : preset.dotColor,
        border: "1px solid rgba(0,0,0,0.1)",
        flexShrink: 0,
      }}
    />
  );
}

interface ControlsToolbarProps {
  settings: CustomSettings;
  onChange: (settings: CustomSettings) => void;
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 36,
        height: 20,
        borderRadius: 10,
        border: "none",
        background: checked ? UI_COLORS.primary : "#ccc",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          background: UI_COLORS.white,
          position: "absolute",
          top: 3,
          left: checked ? 19 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

function ThemeDropdown({
  settings,
  onChange,
}: {
  settings: CustomSettings;
  onChange: (patch: Partial<CustomSettings>) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          border: `1px solid ${UI_COLORS.secondaryBorder}`,
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 500,
          color: UI_COLORS.text,
          minWidth: 140,
        }}
      >
        <ThemeDot preset={settings.theme} />
        {settings.theme.name}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke={UI_COLORS.textMuted}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: "auto", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            marginBottom: 6,
            background: UI_COLORS.white,
            border: `1px solid ${UI_COLORS.secondaryBorder}`,
            borderRadius: 12,
            padding: "8px 0",
            minWidth: 200,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            zIndex: 100,
          }}
        >
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onChange({
                  theme: { ...preset, tweetMode: settings.theme.tweetMode },
                  customBackground: null,
                });
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "10px 16px",
                background: settings.theme.id === preset.id ? "#f0f2f5" : "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: UI_COLORS.text,
                textAlign: "left",
              }}
            >
              <ThemeDot preset={preset} size={18} />
              {preset.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ControlsToolbar({ settings, onChange }: ControlsToolbarProps) {
  function update(patch: Partial<CustomSettings>) {
    onChange({ ...settings, ...patch });
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: UI_COLORS.textMuted,
    marginBottom: 6,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 28,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Theme dropdown */}
      <div>
        <p style={labelStyle}>Theme</p>
        <ThemeDropdown settings={settings} onChange={update} />
      </div>

      {/* Dark mode toggle */}
      <div>
        <p style={labelStyle}>Dark mode</p>
        <Toggle
          checked={settings.theme.tweetMode === "dark"}
          onChange={(v) =>
            update({ theme: { ...settings.theme, tweetMode: v ? "dark" : "light" } })
          }
        />
      </div>

      {/* Shadow toggle */}
      <div>
        <p style={labelStyle}>Shadow</p>
        <Toggle
          checked={settings.shadow}
          onChange={(v) => update({ shadow: v })}
        />
      </div>

      {/* Padding segmented */}
      <div>
        <p style={labelStyle}>Padding</p>
        <div style={{ display: "flex", gap: 0 }}>
          {[16, 32, 48, 64].map((p, i) => (
            <button
              key={p}
              onClick={() => update({ padding: p })}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: settings.padding === p ? 600 : 400,
                background: settings.padding === p ? UI_COLORS.primary : "transparent",
                color: settings.padding === p ? UI_COLORS.white : UI_COLORS.textMuted,
                border: `1px solid ${UI_COLORS.secondaryBorder}`,
                borderLeft: i === 0 ? `1px solid ${UI_COLORS.secondaryBorder}` : "none",
                borderRadius:
                  i === 0
                    ? "8px 0 0 8px"
                    : i === 3
                      ? "0 8px 8px 0"
                      : "0",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
