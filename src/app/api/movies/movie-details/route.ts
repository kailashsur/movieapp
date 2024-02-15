// Import required modules and Prisma Client instance

import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Parse incoming request body to extract movie data
    const { id } = await request.json();
 
    // Query the database to get movies for the requested page
    const data = await prisma.movie.findUnique({
        where : {
            id : parseInt(id)
        }
    });

    return NextResponse.json({
        statusCode: 200,
        status: 'success',
        message: 'Movies retrieved successfully',
        data,
    });

  } catch (error) {
    console.error("Error processing movie request:", error);
    return NextResponse.json({
      statusCode: 500,
      status: "error",
      message: "Internal Server Error",
    });
  }
}
