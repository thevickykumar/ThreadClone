import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { CustomErrorReporter } from "@/validation/CustomErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { commentSchema } from "@/validation/commentSchema";
import prisma from "@/DB/db.config";


export async function POST(request:NextRequest){
    try {
        const session: CustomSession | null = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ status: 200, message: "Un-Authorized" });
        }
        const data=await request.json()
        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(commentSchema);
        const payload = await validator.validate(data);

        /* Increase comment_count */

        await prisma.post.update({
            where:{
                id:Number(payload.post_id),
            },
            data:{
                comment_count:{
                    increment:1,
                },
            },
        });
        // * Add Notification

        await prisma.notification.create({
            data:{
                user_id:Number(session.user?.id),
                toUser_id:Number(payload.toUserId),
                content:"commented on your post."
            }
        })

   /*Add comment in DB */

     await prisma.comment.create({
        data:{
            user_id:Number(session.user?.id),
            post_id:Number(payload.post_id),
            content:payload.content,
        },
    });
   return NextResponse.json({status:200,message:"Comment added successfully!"})
    
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
              { status: 400, errors: error.messages });
    }
}
}