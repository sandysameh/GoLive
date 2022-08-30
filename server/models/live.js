import mongoose from "mongoose";
//create an instance of mongoose
//Here we will define our Schema
const liveSchema = mongoose.Schema({
  startDate: {
    type: String,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

//How can i Give a value u by default staring the section part

const live = mongoose.model("live", liveSchema);
export default live;
