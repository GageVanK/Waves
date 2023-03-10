import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { postFilter, setPostTemplate } from "../../utils";
export interface ProfilePostsProps {
  publicKey: string;
}
const deso = new Deso();
export const Posts = ({ publicKey }: ProfilePostsProps) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  const [posts, setPosts] = useState<JSX.Element[]>([]);
  const getPosts = async () => {
    const posts = (
      await deso.posts.getPostsForPublicKey({
        PublicKeyBase58Check: publicKey,
        NumToFetch: 40,
      })
    ).Posts?.filter(postFilter).map((posts, index) => (
      <div key={index}> {setPostTemplate(posts, publicKey)} </div>
    ));
    if (posts) {
      setPosts(posts);
    }
  };
  return <div>{posts}</div>;
};
