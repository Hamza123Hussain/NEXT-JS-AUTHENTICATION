import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Usermodel from "@/Model/User";
import { MongoConnect } from "@/lib/Mongoconnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { Email, Password } = credentials;

        try {
          await MongoConnect(); // Corrected function call
          const user = await Usermodel.findOne({ Email }); // Corrected field name

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(Password, user.Password);

          if (!passwordsMatch) {
            return null;
          }

          return user;

          
        } catch (error) {
          console.log("Error: ", error);
          return null; // Added return null for error handling
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Corrected sign-in page path
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
