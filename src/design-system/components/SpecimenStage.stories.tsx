import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpecimenCell, SpecimenStage } from "./SpecimenStage";
import { Button } from "./Button";

const meta = {
  title: "Components/SpecimenStage",
  component: SpecimenStage,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A component shown on a background picked to flatter it hides its flaws, so every specimen on the components page sits on the same raised surface, each state labeled by its real name. A component that is itself a card goes without one.\n\nFigma: Specimen stage.",
      },
    },
  },
  args: {
    children: (
      <div className="flex flex-wrap gap-8">
        <SpecimenCell caption="primary">
          <Button variant="primary">Read the system</Button>
        </SpecimenCell>
        <SpecimenCell caption="secondary">
          <Button variant="secondary">See the components</Button>
        </SpecimenCell>
      </div>
    ),
  },
} satisfies Meta<typeof SpecimenStage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCells: Story = {};
