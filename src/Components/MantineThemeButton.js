import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon2 } from "@tabler/icons";

export default function MantineThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={22} /> : <IconMoon2 size={22} />}
    </ActionIcon>
  );
}
