import connectDb from "@utils/database";
import Event from "@models/event";

//GET single Event
export const GET = async (req, { params }) => {
  try {
    await connectDb;
    const id = params.id;
    const event = await Event.findById(id);
    if (!event) {
      return new Response("Event not found", { status: 404 });
    }
    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};

//EDIT single prompt
export const PATCH = async (req, { params }) => {
  const { title, date, time, description } = await req.json();
  try {
    await connectDb;
    const existingEvent = await Event.findById(params.id);
    if (!existingEvent) return new Response("Event Not Found", { status: 404 });
    existingEvent.title = title;
    existingEvent.date = date;
    existingEvent.time = time;
    existingEvent.description = description;
    await existingEvent.save();
    return new Response(JSON.stringify(existingEvent), { status: 200 });
  } catch (error) {
    return new Response("failed to update event", { status: 500 });
  }
};

//DELETE single prompt
export const DELETE = async (req, { params }) => {
  try {
    await connectDb;
    await Event.findByIdAndRemove(params.id);
    return new Response("Event deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Event to delete prompt", { status: 500 });
  }
};
