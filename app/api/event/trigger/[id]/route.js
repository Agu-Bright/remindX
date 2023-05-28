import { Novu } from "@novu/node";
import { TwilioSmsProvider } from "@novu/twilio";
import Event from "@models/event";
import User from "@models/user";

export const GET = async (req, { params }) => {
  //setup
  const { id } = params;
  const novu = new Novu(process.env.NOVU_API_KEY);
  const provider = new TwilioSmsProvider({
    accountSid: process.env.ACCOUNTSID,
    authToken: process.env.AUTH_TOKEN,
    from: process.env.TWILIO_FROM_NUMBER,
  });

  try {
    //get the event
    const event = await Event.findById(id);
    if (!event) return new Response("event not found", { status: 404 });

    // get the user that owns this event
    const user = await User.findById(event.user);

    //trigger the novu event
    await novu.trigger("Reminder", {
      to: [
        {
          subscriberId: user._id,
          email: user.email,
          name: user.userName,
          poneNumber: user.phoneNumber,
        },
      ],
      payload: {
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
      },
    });
    await provider.sendMessage({
      to: user.phoneNumber,
      content: `${event.title}. ${event.description}`,
    });
    //update the event reminder
    return new Response("success", { status: 200 });
  } catch (error) {
    return new Response("success", { status: 500 });
  }
};
