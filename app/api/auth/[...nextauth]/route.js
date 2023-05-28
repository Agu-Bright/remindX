import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        //get user data and set it to the session storage
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.log(error);
      }
    },
    async signIn({ profile }) {
      try {
        // this is a setverless function
        await connectDb;

        //check if the use exists
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          //create a new user and save it to the database
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toString(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
