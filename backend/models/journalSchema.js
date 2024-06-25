import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  date: {
    type: String,
    default: () => new Date().toLocaleDateString(), 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:"https://i0.wp.com/happyfamilies.com.au/wp-content/uploads/2014/02/Settle-down-about-selfies.jpg?resize=768%2C512&ssl=1"
  },
  isLike: {
    type: Boolean,
    default: false
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

export const Journal = mongoose.model("Journal" , journalSchema);
