import { Schema, model, models } from "mongoose";

export const answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  created: { type: Date, default: Date.now },
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
  question_id: { type: Schema.Types.ObjectId, ref: "question", required: true },
});

answerSchema.set("toJSON", { getters: true });

const Answers = models.Answers || model("Answers", answerSchema);

export default Answers;
