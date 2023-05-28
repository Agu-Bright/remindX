import connectDb from "@utils/database";
import User from "@models/user";

export const PATCH = async (req, { params }) => {
  const { phoneNumber } = await req.json();

  try {
    await connectDb;
    const existingUser = await User.findById(params.id);
    if (!existingUser) {
      return new Response("user Not Found", { status: 404 });
    }
    const user = await User.findByIdAndUpdate(params.id, {
      phoneNumber: phoneNumber,
    });
    // existingUser.phoneNumber = phoneNumber;
    // await existingUser.save();
    // console.log(existingUser);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectDb;
    const user = await User.findById(params.id);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, { status: 500 });
  }
};
