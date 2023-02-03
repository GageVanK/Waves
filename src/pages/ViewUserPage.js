import { useLocation } from "react-router-dom";
import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { postFilter } from "../utils";
import {
  Avatar,
  Text,
  Center,
  Space,
  Paper,
  Tooltip,
  ActionIcon,
  CopyButton,
  Group,
  createStyles,
  TypographyStylesProvider,
  Image,
  Button,
} from "@mantine/core";
import {
  IconCheck,
  IconCopy,
  IconHeart,
  IconDiamond,
  IconRecycle,
  IconMessageCircle,
} from "@tabler/icons";
const deso = new Deso();

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    wordWrap: "break-word",
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

export default function ViewUserPage() {
  useEffect(() => {
    GetProfileInfo();
    // eslint-disable-next-line
  }, []);
  const [userPosts, setUserPosts] = useState([]);
  const [followerCount, setFollowerCount] = useState();
  const [followingCount, setFollowingCount] = useState();
  const { classes } = useStyles();
  const location = useLocation();
  const { userPublicKey, userName, userProfilePic } = location.state;

  const GetProfileInfo = async () => {
    //Follower Count for User
    const request = {
      PublicKeyBase58Check: userPublicKey,
      GetEntriesFollowingUsername: true,
    };
    const FollowerCount = await deso.social.getFollowsStateless(request);

    //Follow Count for User
    const request2 = {
      PublicKeyBase58Check: userPublicKey,
      GetEntriesFollowingUsername: false,
    };
    const FollowCount = await deso.social.getFollowsStateless(request2);

    //Get Posts for User
    const request3 = {
      PublicKeyBase58Check: userPublicKey,
      ReaderPublicKeyBase58Check: userPublicKey,
      NumToFetch: 30,
    };

    const UserPosts = await deso.posts.getPostsForPublicKey(request3);

    setUserPosts(UserPosts.Posts);
    setFollowerCount(FollowerCount.NumFollowers);
    setFollowingCount(FollowCount.NumFollowers);
  };

  // Use the userPublicKey to fetch the user's profile information
  return (
    <>
      <Center>
        <Paper
          w={444}
          shadow="xl"
          radius="md"
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          })}
        >
          <CopyButton value={userPublicKey} timeout={2000}>
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
          <Avatar size={77} radius={77} mx="auto" src={userProfilePic} />
          <Center>
            <Text align="center" size="lg" weight={777} mt="md">
              @{userName}
            </Text>
          </Center>
          <Space h="sm" />
          <Center>
            <Text fz="sm">Following: {followingCount}</Text>
            <Space w="sm" />
            <Text fz="sm">Followers: {followerCount}</Text>
          </Center>
          <Space h="md" />
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "cyan", to: "indigo" }}
            radius="md"
          >
            Follow
          </Button>
        </Paper>
      </Center>

      {userPosts.filter(postFilter).map((post) => (
        <div key={post.PostId}>
          <Center>
            <Paper
              m="md"
              shadow="lg"
              radius="xl"
              p="xl"
              withBorder
              className={classes.comment}
            >
              <Group>
                <Space w="xs" />
                <Avatar size={33} radius={33} src={userProfilePic} />
                <Text weight="bold" size="sm">
                  {userName}
                </Text>
              </Group>

              <TypographyStylesProvider>
                <Text align="center" size="md" className={classes.body}>
                  {post.Body}
                </Text>
              </TypographyStylesProvider>

              <Space h="md" />

              {post.ImageURLs && (
                <Group position="center">
                  <Image
                    src={post.ImageURLs[0]}
                    radius="md"
                    alt="post-image"
                    width={333}
                  />
                </Group>
              )}

              <Space h="md" />

              <Center>
                <Tooltip
                  transition="slide-down"
                  withArrow
                  position="bottom"
                  label="Like"
                  transitionDuration={444}
                >
                  <ActionIcon variant="subtle" radius="md" size={36}>
                    <IconHeart size={18} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Text size="xs" color="dimmed">
                  {post.LikeCount}
                </Text>

                <Space w="sm" />

                <Tooltip
                  transition="slide-down"
                  withArrow
                  position="bottom"
                  label="Repost"
                  transitionDuration={444}
                >
                  <ActionIcon variant="subtle" radius="md" size={36}>
                    <IconRecycle size={18} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Text size="xs" color="dimmed">
                  {post.RepostCount}
                </Text>

                <Space w="sm" />

                <Tooltip
                  transition="slide-down"
                  withArrow
                  position="bottom"
                  label="Diamonds"
                  transitionDuration={444}
                >
                  <ActionIcon variant="subtle" radius="md" size={36}>
                    <IconDiamond size={18} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Text size="xs" color="dimmed">
                  {post.DiamondCount}
                </Text>

                <Space w="sm" />

                <Tooltip
                  transition="slide-down"
                  withArrow
                  position="bottom"
                  label="Comments"
                  transitionDuration={444}
                >
                  <ActionIcon variant="subtle" radius="md" size={36}>
                    <IconMessageCircle size={18} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Text size="xs" color="dimmed">
                  {post.CommentCount}
                </Text>
              </Center>
            </Paper>
          </Center>
        </div>
      ))}
    </>
  );
}
