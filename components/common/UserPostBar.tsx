import React from "react";
import UserAvatar from "./UserAvatar";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import DeletePostBtn from "../threads/DeletePostBtn";

export default function UserPostBar({
  post,
  isAuthCard,
}: {
  post: PostType;
  isAuthCard?: boolean;
}) {
  return (
    <div className="flex">
      <UserAvatar name="V" image="" />
      <div className="flex justify-between w-full ml-2 items-start">
        <strong>{post.user.name}</strong>
        <div className="flex items-center">
          <span className="mr-2">{formatDate(post.created_at)}</span>
          {isAuthCard ? (
            <DeletePostBtn id={post.id}/>
          ) : (
            <MoreHorizontal height={22} width={22} />
          )}
        </div>
      </div>
    </div>
  );
}
