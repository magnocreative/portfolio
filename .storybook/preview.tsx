import type { Preview, Decorator } from "@storybook/nextjs-vite";
import React from "react";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

// The real stylesheet and the real fonts. A design system documented against
// an approximation of itself is worse than no documentation — it teaches
// people values that aren't true.
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
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
        // Page chrome (header, footer) sets `padding: 0` so it meets the
        // edges of the frame the way it meets the edges of the window.
        padding: (context.parameters.padding as string | undefined) ?? "2rem",
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
    // The two widths every page is checked at, named for the frames in Figma,
    // ahead of Storybook's defaults. Phone stories pin `phone` in their globals.
    viewport: {
      options: {
        phone: { name: "Phone · 390", styles: { width: "390px", height: "844px" }, type: "mobile" },
        desktop: { name: "Desktop · 1440", styles: { width: "1440px", height: "900px" }, type: "desktop" },
        ...MINIMAL_VIEWPORTS,
      },
    },
    options: {
      storySort: {
        order: ["Foundations", ["Introduction", "Color", "Typography", "Icons", "Motion"], "Primitives", "Components"],
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
