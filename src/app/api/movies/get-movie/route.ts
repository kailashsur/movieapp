// Import required modules and Prisma Client instance

import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Parse incoming request body to extract movie data
    const { page } = await request.json();
    const limit = 10; // Limit of movies per page

    // Calculate offset based on pageNumber and limit
    const offset = (page - 1) * limit;

    // Query the database to get movies for the requested page
    const movies = await prisma.movie.findMany({
        skip: offset,
        take: limit,
        orderBy: {
            id: 'desc', // You can change the ordering as per your requirement
        },
    });

    return NextResponse.json({
        statusCode: 200,
        status: 'success',
        message: 'Movies retrieved successfully',
        movies,
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
