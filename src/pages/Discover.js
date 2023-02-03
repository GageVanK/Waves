import {
  Paper,
  Center,
  Divider,
  Text,
  Space,
  useMantineTheme,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { TwitchPlayer } from "react-twitch-embed";
import { useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";

export default function Discover() {
  const theme = useMantineTheme();
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const handleReady = (e) => {
    embed.current = e;
  };
  return (
    <>
      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Discover
            </Text>
          </>
        }
        labelPosition="center"
      />
      <Space h="xl" />

      <Divider
        my="xs"
        label={
          <>
            <Title
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
              order={4}
            >
              Games
            </Title>
          </>
        }
        labelPosition="left"
        variant="dashed"
      />
      <Carousel
        loop
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        >
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                zrendez
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="zrendez"
                width={333}
                muted
                onReady={handleReady}
                id="1"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Hiko
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="Hiko"
                width={333}
                autoplay={false}
                muted
                onReady={handleReady}
                id="2"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                A2Guapo
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="a2guapo"
                autoplay={false}
                muted
                width={333}
                onReady={handleReady}
                id="3"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Ploo
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="ploo"
                autoplay={false}
                width={333}
                muted
                onReady={handleReady}
                id="4"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Jay3
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="Jay3"
                width={333}
                muted
                onReady={handleReady}
                id="5"
                autoplay={false}
              />
            </Paper>
          </Center>
        </Carousel.Slide>
      </Carousel>
      <Space h="xl" />

      <Divider
        my="xs"
        label={
          <>
            <Title
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
              order={4}
            >
              Music
            </Title>
          </>
        }
        labelPosition="left"
        variant="dashed"
      />
      <Carousel
        loop
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                TPAIN
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="TPAIN"
                width={333}
                muted
                onReady={handleReady}
                id="6"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Office Drummer
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="officedrummer"
                width={333}
                autoplay={false}
                muted
                onReady={handleReady}
                id="7"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Kendra Lyssa
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="KendraLyssa"
                autoplay={false}
                muted
                width={333}
                onReady={handleReady}
                id="8"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Kenny Beats
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="kennybeats"
                width={333}
                autoplay={false}
                muted
                onReady={handleReady}
                id="9"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Claremeans
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="claremeans"
                width={333}
                autoplay={false}
                muted
                onReady={handleReady}
                id="10"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
      </Carousel>
      <Space h="xl" />

      <Divider
        my="xs"
        label={
          <>
            <Title
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
              order={4}
            >
              Chess
            </Title>
          </>
        }
        labelPosition="left"
        variant="dashed"
      />
      <Carousel
        loop
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                GMCanty
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="GMCanty"
                width={333}
                muted
                onReady={handleReady}
                id="11"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                BadChessGoodVibes
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="BadChessGoodVibes"
                width={333}
                autoplay={false}
                muted
                onReady={handleReady}
                id="12"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                ZefCatt
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="zefCatt"
                autoplay={false}
                muted
                width={333}
                onReady={handleReady}
                id="13"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                CyberBunnyB
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="CyberBunnyB"
                width={333}
                autoplay={false}
                muted
                onReady={handleReady}
                id="14"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
        <Carousel.Slide>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                Megasnoop
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="Megasnoop"
                autoplay={false}
                width={333}
                muted
                onReady={handleReady}
                id="15"
              />
            </Paper>
          </Center>
        </Carousel.Slide>
      </Carousel>
    </>
  );
}
