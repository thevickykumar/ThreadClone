import React from "react";
import UserAvatar from "./UserAvatar";
import { formatDate } from "@/lib/utils";
import DeleteCommentBtn from "../threads/DeleteCommentBtn";

export default function CommentCard({
  comment,
  isAuthCard,
}: {
  comment: CommentType;
  isAuthCard?: boolean;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center space-x-4">
        <UserAvatar name={comment.user.name} />
        <div className="bg-muted w-full rounded-lg p-4">
          <div className="flex justify-between items-start w-full">
            <p>{comment.user.name}</p>
            <div className="flex">
              <span>{formatDate(comment.created_at)}</span>
            </div>
          </div>
          <div>{comment.content}</div>
          {isAuthCard && (
            <div className="mt-5 flex justify-end">
             <DeleteCommentBtn id={comment.id}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
