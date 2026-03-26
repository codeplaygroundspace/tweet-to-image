export interface ThemePreset {
  id: string;
  name: string;
  tweetMode: "light" | "dark";
  background: string;
  dotColor: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: "gradient-dune", name: "Dune", tweetMode: "light", background: "linear-gradient(135deg, #e8c47c 0%, #d4956a 100%)", dotColor: "#d4956a" },
  { id: "gradient-ember", name: "Ember", tweetMode: "light", background: "linear-gradient(135deg, #f0a05e 0%, #c75d3a 100%)", dotColor: "#c75d3a" },
  { id: "gradient-ocean", name: "Ocean", tweetMode: "light", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", dotColor: "#4facfe" },
  { id: "gradient-mint", name: "Mint", tweetMode: "light", background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", dotColor: "#43e97b" },
  { id: "gradient-peach", name: "Peach", tweetMode: "light", background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", dotColor: "#fcb69f" },
  { id: "gradient-night", name: "Night Sky", tweetMode: "light", background: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)", dotColor: "#0c3483" },
  { id: "dark", name: "Dark", tweetMode: "dark", background: "#0a0a0a", dotColor: "#333333" },
  { id: "clean-white", name: "Clean White", tweetMode: "light", background: "#f7f9f9", dotColor: "#e5e5e5" },
  { id: "transparent", name: "Transparent", tweetMode: "light", background: "transparent", dotColor: "transparent" },
];

export const DEFAULT_THEME = THEME_PRESETS.find((t) => t.id === "clean-white")!;

/** App-wide UI color tokens (not tweet card colors) */
export const UI_COLORS = {
  primary: "#576f00",
  primaryHover: "rgba(87,111,0,0.9)",
  primaryDark: "#4a5f00",
  secondary: "#536471",
  secondaryHover: "rgba(83,100,113,0.9)",
  secondaryBg: "rgb(247, 247, 242)",
  secondaryBorder: "rgb(213, 213, 210)",
  text: "#0f1419",
  textMuted: "rgb(114, 114, 110)",
  textLight: "#536471",
  error: "#e0245e",
  white: "#fff",
};

export interface CustomSettings {
  theme: ThemePreset;
  customBackground: string | null;
  padding: number;
  shadow: boolean;
  borderRadius: number;
  scale: 1 | 2 | 4;
}

export const DEFAULT_SETTINGS: CustomSettings = {
  theme: DEFAULT_THEME,
  customBackground: null,
  padding: 48,
  shadow: true,
  borderRadius: 16,
  scale: 2,
};
