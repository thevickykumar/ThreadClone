import Image from "next/image";
import AddThread from "@/components/threads/AddThreads";
import PostCard from "@/components/common/PostCard";
import { getPosts } from "@/lib/serverMethods";

export default async function Home() {
  const posts: Array<PostType> | [] = await getPosts();
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image
          src="/images/logo.svg"
          width={50}
          height={50}
          alt="Logo"
          className="hidden md:block" 
        />
      </div>
      <AddThread />
      <div className="mt-10">
        {posts.map((item) => (
          <PostCard post={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
