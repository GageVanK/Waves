import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { PublicKey } from "../State/App.state";
import _ from "lodash";
import {
  Text,
  Avatar,
  Group,
  createStyles,
  Paper,
  TypographyStylesProvider,
  Center,
  Space,
  ActionIcon,
  Tooltip,
  TextInput,
  Button,
  Image,
  Flex,
  CopyButton,
} from "@mantine/core";
import {
  IconHeart,
  IconDiamond,
  IconRecycle,
  IconMessageCircle,
  IconCopy,
  IconCheck,
} from "@tabler/icons";
import { useRecoilValue } from "recoil";

import { useNavigate } from "react-router";

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

export default function Home() {
  const [create, setPost] = useState("");
  const [feed, setFeed] = useState([]);

  const navigate = useNavigate();

  const publicKey = useRecoilValue(PublicKey);
  const { classes } = useStyles();

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    const request = {
      PublicKeyBase58Check:
        "BC1YLiHVU5UCHeP1MzMUoDAptWK1zXJm68JCumFB4v6CeaSkk6c1v8U",
      ReaderPublicKeyBase58Check:
        "BC1YLiHVU5UCHeP1MzMUoDAptWK1zXJm68JCumFB4v6CeaSkk6c1v8U",
      NumToFetch: 40,
    };
    const response = await deso.posts.getPostsStateless(request);

    if (!response) {
      console.log("No response from the server");
    }
    setFeed(response.PostsFound);
  };

  return (
    <>
      {publicKey ? (
        <Center>
          <Paper shadow="xl" p="xl" withBorder>
            <Flex
              mih={50}
              gap="xl"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap"
            >
              <Avatar
                size={44}
                radius={33}
                src={deso.user.getSingleProfilePicture(publicKey)}
              />
              <TextInput
                variant="unstyled"
                placeholder="Let them hear your voice!"
                radius="md"
                size="xl"
                value={create}
                onChange={(e) => {
                  setPost(e.target.value);
                }}
                className="ml-2 min-w-[400px] min-h-[50px] text-black"
              />

              <Space h="md" />
              <Group position="right">
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!create) {
                      console.log("Create state is empty, cannot submit post.");
                      return;
                    }
                    try {
                      await deso.posts.submitPost({
                        UpdaterPublicKeyBase58Check: publicKey,
                        BodyObj: {
                          Body: create,
                          VideoURLs: [],
                          ImageURLs: [],
                        },
                      });
                      setPost("");
                      console.log("Post submitted successfully!");
                    } catch (error) {
                      console.log("Error submitting post: ", error);
                    }
                  }}
                >
                  Create
                </Button>
              </Group>
            </Flex>
          </Paper>
        </Center>
      ) : (
        <Center>
          <Paper shadow="xl" p="xl" withBorder>
            <Flex
              mih={50}
              gap="xl"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap"
            >
              <Avatar size={44} radius={33} />
              <TextInput
                variant="unstyled"
                placeholder="Let them hear your voice!"
                radius="md"
                size="xl"
                className="ml-2 min-w-[400px] min-h-[50px] text-black"
              />

              <Space h="md" />
              <Group position="right">
                <Tooltip
                  transition="slide-up"
                  transitionDuration={444}
                  label="Login to Create!"
                >
                  <Button
                    data-disabled
                    sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
                    onClick={(event) => event.preventDefault()}
                  >
                    Create
                  </Button>
                </Tooltip>
              </Group>
            </Flex>
          </Paper>
        </Center>
      )}
      <Space h="md" />
      {feed.map((post, index) => (
        <Group position="center">
          <Paper
            m="md"
            shadow="lg"
            radius="xl"
            p="xl"
            withBorder
            className={classes.comment}
            key={index}
          >
            <Group w={"100%"} position="right">
              <CopyButton
                value={post.PosterPublicKeyBase58Check}
                timeout={2000}
              >
                {({ copied, copy }) => (
                  <Tooltip
                    label={
                      copied
                        ? "Copied User's Public Key"
                        : "Copy User's Public Key"
                    }
                    withArrow
                    position="right"
                    transitionDuration={11}
                    transition="scale-x"
                  >
                    <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                      {copied ? (
                        <IconCheck size={14} />
                      ) : (
                        <IconCopy size={14} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>

            <Group position="center">
              <Space w="xs" />

              <ActionIcon
                onClick={() =>
                  navigate(`/profile/${post.ProfileEntryResponse.Username}`, {
                    state: {
                      userPublicKey: post.PosterPublicKeyBase58Check,
                      userName: post.ProfileEntryResponse.Username,
                      userProfilePic: deso.user.getSingleProfilePicture(
                        post.PosterPublicKeyBase58Check
                      ),
                    },
                  })
                }
                variant="transparent"
              >
                <Avatar
                  size={55}
                  radius={33}
                  src={deso.user.getSingleProfilePicture(
                    post.PosterPublicKeyBase58Check
                  )}
                />
                <Space w="xs" />
                <Text weight="bold" size="sm">
                  {_.get(post, "ProfileEntryResponse.Username", "anon")}
                </Text>
              </ActionIcon>
            </Group>
            <Space h="md" />
            <Group position="center" width={"100%"}>
              <TypographyStylesProvider>
                <Text
                  width={"100%"}
                  align="center"
                  size="md"
                  className={classes.body}
                >
                  {post.Body}
                </Text>
              </TypographyStylesProvider>
            </Group>
            <Space h="md" />
            {post.ImageURLs && (
              <Center>
                <Image
                  fit="contain"
                  src={post.ImageURLs[0]}
                  radius="md"
                  alt="post-image"
                  width={333}
                />
              </Center>
            )}
            <Space h="md" />
            <Center>
              <Tooltip
                transition="slide-down"
                withArrow
                position="bottom"
                label="Like"
                transitionDuration={11}
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
                transitionDuration={11}
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
                transitionDuration={11}
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
                transitionDuration={11}
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
        </Group>
      ))}
    </>
  );
}
