import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HistoryRow } from "./HistoryRow";
import { BriefcaseIcon } from "./Icon";
import { UiwLogo } from "@/design-system/brand/OrgLogos";

const meta = {
  title: "Components/HistoryRow",
  component: HistoryRow,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One line of history with no card: a 48px mark, a title, and where and when beside each other under it. An organization's logo when there is one; otherwise a stroke icon in an outlined tile of the same size. Mirrors the History row component in Figma.",
      },
    },
  },
  args: {
    logo: UiwLogo,
    title: "Bachelor of Fine Arts, Computer Graphic Arts",
    detail: "University of the Incarnate Word",
    period: "Class of 2015",
  },
} satisfies Meta<typeof HistoryRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLogo: Story = {};

export const WithIcon: Story = {
  args: {
    logo: undefined,
    icon: BriefcaseIcon,
    title: "Graphic designer and technical illustrator",
    detail: "SWBC and Elbit Systems of America",
    period: "2013 to 2017",
  },
  parameters: { docs: { description: { story: "No logo to show, so the briefcase stands in, outlined so it never reads as a brand." } } },
};

export const Pair: Story = {
  name: "As the résumé sets them",
  render: () => (
    <div className="flex flex-col gap-8">
      <HistoryRow
        icon={BriefcaseIcon}
        title="Graphic designer and technical illustrator"
        detail="SWBC and Elbit Systems of America"
        period="2013 to 2017"
      />
      <HistoryRow
        logo={UiwLogo}
        title="Bachelor of Fine Arts, Computer Graphic Arts"
        detail="University of the Incarnate Word"
        period="Class of 2015"
      />
    </div>
  ),
  parameters: { docs: { description: { story: "Education and early career: two rows 32px apart, newest first." } } },
};

export const Phone: Story = {
  ...Pair,
  name: "Phone",
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: { docs: { description: { story: "At 390 the titles wrap and each mark holds to the top, beside its title." } } },
};
