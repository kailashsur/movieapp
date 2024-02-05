import { NextRequest, NextResponse } from "next/server";

export async function GET(responce: NextResponse) {
  try {
    return NextResponse.json({
      status: 200,
      success: "Successfully executed"
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: "Something went wrong to getting"
    })
  }
}
