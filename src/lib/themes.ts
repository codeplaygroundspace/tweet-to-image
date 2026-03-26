export interface ThemePreset {
  id: string;
  name: string;
  tweetMode: "light" | "dark";
  background: string;
}

export const GRADIENT_PRESETS: ThemePreset[] = [
  { id: "gradient-purple", name: "Purple Haze", tweetMode: "light", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "gradient-sunset", name: "Sunset", tweetMode: "light", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: "gradient-ocean", name: "Ocean", tweetMode: "light", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { id: "gradient-mint", name: "Mint", tweetMode: "light", background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
  { id: "gradient-peach", name: "Peach", tweetMode: "light", background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
  { id: "gradient-night", name: "Night Sky", tweetMode: "light", background: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)" },
];

export const THEME_PRESETS: ThemePreset[] = [
  ...GRADIENT_PRESETS,
  { id: "dark", name: "Dark", tweetMode: "dark", background: "#0a0a0a" },
  { id: "clean-white", name: "Clean White", tweetMode: "light", background: "#f7f9f9" },
];

export const DEFAULT_THEME = THEME_PRESETS[0];

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
