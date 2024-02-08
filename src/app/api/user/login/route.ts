import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { emailRegex } from "@/lib/regx";
import { passwordRegex } from "@/lib/regx";
import formateDatatoSend from "@/middleware/formatedDatatoSend";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Assuming you're expecting JSON data in the request body
    let { email, password } = await request.json();

    // validating the data from frontend
    if (!email.length) {
      return NextResponse.json({ status: 403, error: "Enter Email" });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ status: 403, Error: "Email is invalid" });
    }
    if (!passwordRegex.test(password)) {
      return NextResponse.json({
        status: 403,
        Error:
          "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
      });
    }

    //-----------------------------

    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return NextResponse.json({
        status: 404,
        error: "User not found",
      });
    }

    if (userData.password) {
      bcrypt.compare(password, userData.password, (err, result) => {
        if (err) {
          return NextResponse.json({ status : 403, error: "Error occured while login please try again" });
        }
        if (!result) {
          return NextResponse.json({ status : 403, error: "Incorect Password" });
        } else {
          return NextResponse.json(formateDatatoSend(userData));
        }
      });
    }

    return NextResponse.json({
        status : 200,
        success : "User Loged in successfully",
        data : formateDatatoSend(userData)
    })
    
  } catch (error) {
    console.error("Error processing POST request:", error);

    // Set the status code to 500 using the status property

    // Return a JSON response
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
