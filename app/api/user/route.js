import connectDb from "@utils/connectDb";
import User from "@models/prompt";

export const GET = async (req, res) => {
  try {
    await connectDb;
    const prompts = await User.find({});

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, { status: 500 });
  }
};
