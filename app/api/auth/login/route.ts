import { CustomErrorReporter } from "@/validation/CustomErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt, { compareSync} from 'bcryptjs'
import prisma from "@/DB/db.config";
import { loginSchema } from "@/validation/registerSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(body);

    //  * Check is there any email or not
    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!findUser) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "No account found with this email.",
        },
      });
    }
    //* check if password matches
     const checkPassword=compareSync(payload.password , findUser.password!)
     if(checkPassword){
        return NextResponse.json({
          status:200,
          message:"User login successfully"
        });
     }
     return NextResponse.json({
      status:400,
      errors:{email:"Invalid credentials",},
     });
  }catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}