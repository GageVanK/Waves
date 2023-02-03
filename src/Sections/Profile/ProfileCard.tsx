import {
  Space,
  Avatar,
  Text,
  Paper,
  Center,
  Group,
  CopyButton,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";
import { PublicKey } from "../../State/App.state";
import { useRecoilValue } from "recoil";
import { ProfilePic } from "../../Components/ProfilePic";

export interface ProfileCardProps {
  publicKey: string;
}
export const ProfileCard = () => {
  const publicKey = useRecoilValue(PublicKey);

  return (
    <>
      {publicKey ? (
        <Center>
          <Paper
            w={444}
            shadow="xl"
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
            })}
          >
            <CopyButton value={publicKey} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied Public Key" : "Copy Public Key"}
                  withArrow
                  position="right"
                  transitionDuration={333}
                  transition="scale-x"
                >
                  <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
            <ProfilePic publicKey={publicKey as string} />
          </Paper>
        </Center>
      ) : (
        <Center>
          <Paper shadow="xl" radius="md" p="xl" withBorder>
            <Space h="xl" />
            <Text
              size="xl"
              lineClamp={4}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            >
              Please login to view your Profile.
            </Text>

            <Space h="xl" />
            <Group position="center">
              <Avatar size={77} radius="xl" />
            </Group>
            <Space h="xl" />
          </Paper>
        </Center>
      )}
    </>
  );
};
