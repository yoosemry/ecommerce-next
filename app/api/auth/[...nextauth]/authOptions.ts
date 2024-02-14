import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import prisma from "@/prisma/client";

export const authOption: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
   
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma)
}