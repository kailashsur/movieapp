import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import hashPass from "@/middleware/bcrypt";
import { emailRegex } from "@/lib/regx";
import { passwordRegex } from "@/lib/regx";
import formateDatatoSend from "@/middleware/formatedDatatoSend";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Assuming you're expecting JSON data in the request body
    let { name, email, password } = await request.json();

    // validating the data from frontend
    if (name.length < 3) {
      return NextResponse.json({ 
        status : 403,
        error: "Name must at least 3 letter long" });
    }
    if (!email.length) {
      return NextResponse.json({ status : 403, error: "Enter Email" });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ status : 403, Error: "Email is invalid" });
    }
    if (!passwordRegex.test(password)) {
      return NextResponse
        .json({
          status : 403,
          Error:
            "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
        });
    }

    //-----------------------------

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return NextResponse.json({
        status: 400,
        error: "Email alredy exist",
      });
    }

    //hitesh-----------

    // const hashedPassword = await hashPass(password)

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: (await hashPass(password)).toString(),
      },
    });
// console.log("new user ",newUser);

    //------------------

    // Return a response with status code 200
    return NextResponse.json({
      status: 200,
      success: "User created successfully",
      data : formateDatatoSend(newUser)
    });


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
