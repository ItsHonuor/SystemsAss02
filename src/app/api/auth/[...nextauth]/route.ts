import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    // Check Staff table first
                    const staff = await prisma.staff.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (staff) {
                        const passwordMatch = await bcrypt.compare(
                            credentials.password as string,
                            staff.password
                        );
                        if (!passwordMatch) return null;
                        return {
                            id: String(staff.id),
                            email: staff.email,
                            name: `${staff.firstName} ${staff.lastName}`,
                            role: staff.role,
                        };
                    }

                    // Then check User table
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (user) {
                        const passwordMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );
                        if (!passwordMatch) return null;
                        return {
                            id: String(user.id),
                            email: user.email,
                            name: `${user.firstName} ${user.lastName}`,
                            role: "Guest",
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };