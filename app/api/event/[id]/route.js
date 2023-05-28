import connectDb from "@utils/database";
import Event from "@models/event";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    let myEvents;
    await connectDb;
    myEvents = await Event.find({ user: id });
    console.log(myEvents);
    myEvents = myEvents.reverse();

    return new Response(JSON.stringify(myEvents), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, { status: 500 });
  }
};
