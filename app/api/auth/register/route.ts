 import { CustomErrorReporter } from "@/validation/CustomErrorReporter";
import { registerSchema } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest,NextResponse } from "next/server";
import  bcrypt, { genSaltSync, hashSync } from 'bcryptjs'
import prisma from "@/DB/db.config";

 export async function POST(request:NextRequest) {
    try {
        const data=await request.json();

        vine.errorReporter=() => new CustomErrorReporter();

        const validator=vine.compile(registerSchema);
        const payload=await validator.validate(data);

        // * check email
        const isEmailExist = await prisma.user.findUnique({
            where: {
              email: payload.email,
            },
            select: {
              id: true,
            },
          });
      
          if (isEmailExist) {
            return NextResponse.json({
              status: 400,
              errors: {
                email: "Email already exists. please use another email.",
              },
            });
          }

          // check username
          const isUsernameExist =await prisma.user.findUnique({
            where: {
                username:payload.username,
            },
            select:{
                id:true,
            },
          });
          if(isUsernameExist){
            return NextResponse.json({
                status:400,
                errors:{
                    username: "Username already exists.please use another email"
                },
            });
          }

        // * to hash the password
        const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    await prisma.user.create({ data: payload });
    return NextResponse.json({
      status: 200,
      message: "Account created successfully.Please login into your account!",
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}