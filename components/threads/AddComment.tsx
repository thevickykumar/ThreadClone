"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageCircle } from "lucide-react";
import UserPostBar from "../common/UserPostBar";
import { useSession } from "next-auth/react";
import UserAvatar from "../common/UserAvatar";
import axios from "axios";
import { useToast } from "../ui/use-toast";

export default function AddComment({ post }: { post: PostType }) {
  const { data } = useSession();
  const { toast } = useToast();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});

  const submit = () => {
    setLoading(true);
    axios
      .post("/api/comment", {
        content: content,
        post_id: post.id.toString(),
        toUserId:post.user_id.toString(),
      })
      .then((res) => {
        const response = res.data;

        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {
          setContent("");
          setErrors({});
          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-500",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The errror is", err);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MessageCircle width={20} height={20} className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Comment</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mt-5">
              <UserPostBar post={post} />
              <div className="ml-12 mt-[-12px]">{post.content}</div>
            </div>
            <div className="mt-5 flex justify-start items-start">
              <UserAvatar name={data?.user?.name ?? "V"} />
              <textarea
                className="w-full h-24 text-md p-2
                bg-background outline-none resize-none rounded-lg
                placeholder:font-normal ml-2"
                placeholder="Type your comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <span className="text-red-400 font-bold ml-12">
              {errors?.content}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
