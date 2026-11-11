import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// Storybook is published at storybook.magnocreative.com, so it says whose
// system it is: the sidebar names it and links back to the site. The theme
// follows the viewer's light or dark setting, as Storybook's own default does.
const NAME = "MagnoCreative design system";

const dark =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;

addons.setConfig({
  theme: create({
    base: dark ? "dark" : "light",
    brandTitle: NAME,
    brandUrl: "https://magnocreative.com",
    brandTarget: "_self",
  }),
});

// The browser tab. Storybook writes "<story> ⋅ Storybook" on every navigation,
// with the suffix fixed in its own code, and the page starts as
// "<package name> - Storybook". The tab is what a visitor sees in their bar
// and their history, so it carries the system's name instead.
if (typeof document !== "undefined") {
  const retitle = () => {
    const t = document.title;
    const next =
      t === "Storybook" || t.endsWith(" - Storybook") ? NAME : t.replace(/ ⋅ Storybook$/, ` ⋅ ${NAME}`);
    if (next !== t) document.title = next;
  };
  retitle();
  new MutationObserver(retitle).observe(document.head, { subtree: true, childList: true, characterData: true });
}
