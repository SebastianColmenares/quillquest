import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
           async authorize(credentials, req) {
                console.log(credentials);

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if(!userFound) throw new Error("Usuario no enontrado");
                console.log(userFound);

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                if(!matchPassword) throw new Error("Contraseña incorrecta");

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/ingreso",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };