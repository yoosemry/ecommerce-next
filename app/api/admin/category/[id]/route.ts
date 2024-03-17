import { categorySchema } from "@/validation/categorySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {


    // UPDATE CATEGORY

    if (request.headers.get("content-length") === "0") {
        return NextResponse.json({ error: "you have to provide body information" }, { status: 400 })
    }


    const body = await request.json();

    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const category = await prisma?.categoty.findUnique({ where: { id: params.id } })

    if (!category) return NextResponse.json("unknow category please check out", { status: 404 })

    const updatecategory = await prisma?.categoty.update({
        where: { id: params.id },
        data: {
            name: body.name,
        }
    });

    return NextResponse.json(updatecategory, { status: 200 });



}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {


    // DELETE CATEGORY

    if (request.headers.get("content-length") === "0") {
        return NextResponse.json({ error: "you have to provide body information" }, { status: 400 })
    }


    
    const category = await prisma?.categoty.findUnique({ where: { id: params.id } })

    if (!category) return NextResponse.json("unknow category please check out", { status: 404 })

    const deletecategory = await prisma?.categoty.delete({
        where: { id: params.id },
        
    });

    return NextResponse.json(deletecategory, { status: 200 });



}