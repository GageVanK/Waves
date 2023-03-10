import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { Avatar, Text, Center, Space } from "@mantine/core";
import {
  GetSingleProfileResponse,
  // PostEntryResponse,
  GetFollowsResponse,
} from "deso-protocol-types";

export interface ProfilePicProps {
  publicKey: string;
}
const deso = new Deso();
export const ProfilePic = ({ publicKey }: ProfilePicProps) => {
  useEffect(() => {
    getProfilePic();
  });

  const [profile, setProfile] = useState<null | GetSingleProfileResponse>(null);
  const [followerInfo, setFollowers] = useState<null | FollowerInfo>(null);

  const getProfilePic = async () => {
    const profile = await deso.user.getSingleProfile({
      PublicKeyBase58Check: publicKey,
    });

    const followers = await deso.social.getFollowsStateless({
      PublicKeyBase58Check: publicKey,
      GetEntriesFollowingUsername: true,
    });
    const following = await deso.social.getFollowsStateless({
      PublicKeyBase58Check: publicKey,
    });

    setProfile(profile);
    setFollowers({ following, followers });
  };

  return (
    <>
      <Avatar
        size={77}
        radius={77}
        mx="auto"
        src={deso.user.getSingleProfilePicture(publicKey)}
      />
      <Center>
        <Text align="center" size="lg" weight={777} mt="md">
          {profile?.Profile?.Username && "@" + profile?.Profile?.Username}
        </Text>
      </Center>

      {followerInfo && (
        <FollowerDisplay
          followers={followerInfo.followers}
          following={followerInfo.following}
        />
      )}
    </>
  );
};

const FollowerDisplay = ({ followers, following }: FollowerInfo) => {
  return (
    <>
      <Center>
        <Text fz="sm">
          {followers && `Following: ${following.NumFollowers}`}
        </Text>
        <Space w="sm" />
        <Text fz="sm">
          {followers && ` Followers: ${followers.NumFollowers}`}
        </Text>
      </Center>
    </>
  );
};
type FollowerInfo = {
  followers: GetFollowsResponse;
  following: GetFollowsResponse;
};
