import prisma from "@/DB/db.config";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { rmSync } from "fs";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session:CustomSession|null = await getServerSession(authOptions)
   if(!session){
    return NextResponse.json({status:401,message:"Un-Authorized"})
   }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      Comment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      },
      Likes:{
        take:1,
        where:{
          user_id:Number(session?.user?.id),
        },
      },
    },
  });
  return NextResponse.json({ status: 200, data: post });
}

// Delete Post

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }
  const findPost=await prisma.post.findFirst({
    where:{
        id:Number(params.id),
        user_id:Number(session?.user?.id)
    }
  })
   if(!findPost){
     return NextResponse.json({status:400,message:" Bad request"})
   }
   // remove image

   if(findPost.image !== "" && findPost.image!== null){
    const dir= join(process.cwd(),"public","/uploads")
    const path=dir+"/"+findPost?.image
    rmSync(path,{force:true})
   }
   await prisma.post.delete({
    where:{
        id:Number(params.id)
    }
   })
   return NextResponse.json({status:200,message:"Post Deleted Successfully"})
}
