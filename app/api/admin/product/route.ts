import { categorySchema } from "@/validation/categorySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client"

export async function POST(request: NextRequest) {


    const formData = await request.formData();


    return NextResponse.json("here we go", { status: 201 });


}



export async function GET(request: NextRequest) {

    // GET PRODUCT 

    const getProducts = await prisma.product.findMany({ orderBy: { created: 'desc' } });

    return NextResponse.json(getProducts, { status: 200 })
}