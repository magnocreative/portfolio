import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Three states, not two. A binary switch silently discards *follow my system* — the setting most visitors actually want — and never gives it back once it has been touched. Rendered as a radiogroup so the three options are announced as one control with a current selection, rather than three unrelated buttons.",
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Where it actually lives: right-aligned in the header, sharing a baseline with the nav. At this size the icons carry no label, so each button keeps an aria-label and a title.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "1.25rem 2rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", fontSize: "0.875rem", fontWeight: 500 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-accent)" }}>AF</span>
        <span>Alejandro Fernandini</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
        <div style={{ display: "flex", gap: "1.75rem" }}>
          {["Work", "System", "About"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--text-secondary)",
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </div>
  ),
};
