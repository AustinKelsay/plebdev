import { Schema, model, models } from "mongoose";

export const voteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  vote: { type: Number, required: true },
  parentId: { type: Schema.Types.ObjectId, required: true },
});

voteSchema.set("toJSON", { getters: true });
voteSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Votes = models.Votes || model("Votes", voteSchema);

export default Votes;
