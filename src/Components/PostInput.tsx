import { useEffect, useState } from "react";
import { Button, Group, TextInput, Space } from "@mantine/core";
import Deso from "deso-protocol";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";

const deso = new Deso();

const PostInput = () => {
  const [post, setPost] = useState("");
  useEffect(() => {}, [post, setPost]);
  const publicKey = useRecoilValue(PublicKey);
  return (
    <>
      <Group position="center">
        <TextInput
          variant="unstyled"
          placeholder="Let them hear your voice!"
          radius="md"
          size="xl"
          value={post}
          onChange={(e: any) => {
            setPost(e.target.value);
          }}
          className="ml-2 min-w-[400px] min-h-[50px] text-black"
        />
      </Group>
      <Space h="md" />
      <Group position="right">
        <Button
          variant="outline"
          onClick={async () => {
            if (!post) {
              return;
            }
            await deso.posts.submitPost({
              UpdaterPublicKeyBase58Check: publicKey as string,
              BodyObj: {
                Body: post,
                VideoURLs: [],
                ImageURLs: [],
              },
            });
            setPost("");
          }}
        >
          Post
        </Button>
      </Group>
    </>
  );
};

export default PostInput;
