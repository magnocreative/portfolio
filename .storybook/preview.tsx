import type { Preview, Decorator } from "@storybook/nextjs-vite";
import React from "react";

// The real stylesheet and the real fonts. A design system documented against
// an approximation of itself is worse than no documentation — it teaches
// people values that aren't true.
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/jetbrains-mono";
import "../src/app/globals.css";

/**
 * Paints the story on the real page surface and pins the theme, so every
 * component can be checked in both without leaving the panel.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as "light" | "dark";

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      data-theme={theme}
      style={{
        background: "var(--surface-page)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-sans)",
        padding: "2rem",
        minHeight: "100vh",
        colorScheme: theme,
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    options: {
      storySort: {
        order: ["Foundations", ["Introduction", "Color", "Typography", "Motion"], "Primitives", "Components"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Paper (light)" },
          { value: "dark", title: "Instrument (dark)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
