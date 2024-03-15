import { categorySchema } from "@/validation/categorySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client"

export async function POST(request: NextRequest) {


    // NEW CATEGORY

    if (request.headers.get("content-length") === "0") {
        return NextResponse.json({ error: "you have to provide body information" }, { status: 400 })
    }


    const body = await request.json();

    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
 

    const newCategory = await prisma.categoty.create({
        data: {
          name :  body.name
        }
    });

    return NextResponse.json(newCategory, { status: 201 });


}



export async function GET(request: NextRequest) {

    // GET ALL CATEGORY

    const getCategory = await prisma.categoty.findMany({});
    
    return NextResponse.json(getCategory, { status: 200 })
}