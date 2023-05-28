const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: String,
    required: [true, "recipient is required"],
  },
  reminders: [
    {
      timeBefore: {
        type: Number,
        required: false, //set this to true
      },
      isSent: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

//because this route is called every time a user signIn we need to make this additional check
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
