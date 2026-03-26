"use client";

import { useEffect, useRef, useState } from "react";
import { THEME_PRESETS, type CustomSettings } from "@/lib/themes";

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
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        border: "none",
        background: checked ? "#1d9bf0" : "#ccc",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          background: "#fff",
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
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
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 500,
          color: "#0f1419",
          minWidth: 140,
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            background: settings.theme.dotColor,
            border: "1px solid rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        />
        {settings.theme.name}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="#536471"
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
            background: "#1a1a1a",
            borderRadius: 12,
            padding: "8px 0",
            minWidth: 200,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
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
                background: settings.theme.id === preset.id ? "rgba(255,255,255,0.1)" : "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: "#e7e9ea",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: preset.dotColor,
                  border: "1px solid rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}
              />
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
    fontSize: 12,
    fontWeight: 500,
    color: "#536471",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
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
                background: settings.padding === p ? "#0f1419" : "transparent",
                color: settings.padding === p ? "#fff" : "#536471",
                border: "1px solid #e5e5e5",
                borderLeft: i === 0 ? "1px solid #e5e5e5" : "none",
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

      {/* Scale segmented */}
      <div>
        <p style={labelStyle}>Scale</p>
        <div style={{ display: "flex", gap: 0 }}>
          {([1, 2, 4] as const).map((s, i) => (
            <button
              key={s}
              onClick={() => update({ scale: s })}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: settings.scale === s ? 600 : 400,
                background: settings.scale === s ? "#0f1419" : "transparent",
                color: settings.scale === s ? "#fff" : "#536471",
                border: "1px solid #e5e5e5",
                borderLeft: i === 0 ? "1px solid #e5e5e5" : "none",
                borderRadius:
                  i === 0
                    ? "8px 0 0 8px"
                    : i === 2
                      ? "0 8px 8px 0"
                      : "0",
                cursor: "pointer",
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
