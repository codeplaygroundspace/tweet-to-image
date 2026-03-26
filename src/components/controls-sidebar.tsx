"use client";

import { THEME_PRESETS, type CustomSettings } from "@/lib/themes";

interface ControlsSidebarProps {
  settings: CustomSettings;
  onChange: (settings: CustomSettings) => void;
}

const sectionLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#536471",
  letterSpacing: "0.05em",
  marginBottom: 8,
};

export function ControlsSidebar({ settings, onChange }: ControlsSidebarProps) {
  function update(patch: Partial<CustomSettings>) {
    onChange({ ...settings, ...patch });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 260 }}>
      {/* Theme */}
      <section>
        <p style={sectionLabel}>Theme</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => update({ theme: preset, customBackground: null })}
              title={preset.name}
              style={{
                width: "100%",
                height: 48,
                background: preset.background,
                border:
                  settings.theme.id === preset.id
                    ? "2px solid #1d9bf0"
                    : "2px solid #e5e5e5",
                borderRadius: 8,
                cursor: "pointer",
                outline: "none",
              }}
            />
          ))}
        </div>
      </section>

      {/* Tweet Style */}
      <section>
        <p style={sectionLabel}>Tweet Style</p>
        <div style={{ display: "flex", gap: 8 }}>
          {(["light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() =>
                update({ theme: { ...settings.theme, tweetMode: mode } })
              }
              style={{
                flex: 1,
                padding: "6px 0",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                cursor: "pointer",
                border:
                  settings.theme.tweetMode === mode
                    ? "1px solid #1d9bf0"
                    : "1px solid #e5e5e5",
                background:
                  settings.theme.tweetMode === mode ? "#e8f5fd" : "#fff",
                color:
                  settings.theme.tweetMode === mode ? "#1d9bf0" : "#0f1419",
              }}
            >
              {mode === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </section>

      {/* Custom Background */}
      <section>
        <p style={sectionLabel}>Custom Background</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="color"
            value={settings.customBackground ?? "#ffffff"}
            onChange={(e) => update({ customBackground: e.target.value })}
            style={{
              width: 36,
              height: 36,
              border: "1px solid #e5e5e5",
              borderRadius: 6,
              cursor: "pointer",
              padding: 2,
            }}
          />
          {settings.customBackground && (
            <button
              onClick={() => update({ customBackground: null })}
              style={{
                fontSize: 12,
                color: "#536471",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Padding */}
      <section>
        <p style={sectionLabel}>Padding ({settings.padding}px)</p>
        <input
          type="range"
          min={16}
          max={80}
          value={settings.padding}
          onChange={(e) => update({ padding: Number(e.target.value) })}
          style={{ width: "100%" }}
        />
      </section>

      {/* Corner Radius */}
      <section>
        <p style={sectionLabel}>Corner Radius ({settings.borderRadius}px)</p>
        <input
          type="range"
          min={0}
          max={32}
          value={settings.borderRadius}
          onChange={(e) => update({ borderRadius: Number(e.target.value) })}
          style={{ width: "100%" }}
        />
      </section>

      {/* Shadow */}
      <section>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          <input
            type="checkbox"
            checked={settings.shadow}
            onChange={(e) => update({ shadow: e.target.checked })}
          />
          Shadow
        </label>
      </section>

      {/* Export Scale */}
      <section>
        <p style={sectionLabel}>Export Scale</p>
        <div style={{ display: "flex", gap: 8 }}>
          {([1, 2, 4] as const).map((s) => (
            <button
              key={s}
              onClick={() => update({ scale: s })}
              style={{
                flex: 1,
                padding: "6px 0",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                cursor: "pointer",
                border:
                  settings.scale === s
                    ? "1px solid #1d9bf0"
                    : "1px solid #e5e5e5",
                background: settings.scale === s ? "#e8f5fd" : "#fff",
                color: settings.scale === s ? "#1d9bf0" : "#0f1419",
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
