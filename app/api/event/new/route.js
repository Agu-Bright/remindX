import connectDb from "@utils/database";
import Event from "@models/event";
import axios from "axios";
function convertToMilliseconds(dateString) {
  const dateObj = new Date(dateString);
  const milliseconds = dateObj.getTime();

  return milliseconds;
}

export const POST = async (req) => {
  const { title, date, time, description, recipient, user, reminders } =
    await req.json();
  try {
    await connectDb;
    const event = await Event.create({
      title: title,
      date: date,
      time: time,
      description: description,
      user: user,
      recipient: recipient,
      reminders: reminders,
    });
    const remObj = reminders[0];
    const time = remObj.timeBefore; //0.0833hrs
    console.log(date);

    const milisec = convertToMilliseconds(date);
    // //get the two timeouts ie 24hrs before and 1 hr before
    setTimeout(async () => {
      try {
        await axios.get(
          `${process.env.NEXTAUTH_URL}/api/event/trigger/${event._id}`
        );
        return new Response("success", { status: 201 });
      } catch (error) {
        console.log(error);
        return new Response(`${error}`, { status: 500 });
      }
    }, milisec - 300000);

    //set time out based on the event occurance

    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, { status: 500 });
  }
};
