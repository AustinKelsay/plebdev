import { Schema, model, models } from 'mongoose';

export const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  body: { type: String, required: true },
  answer_id: { type: Schema.Types.ObjectId, ref: 'answer', required: true },
  created: { type: Date, default: Date.now }
});

commentSchema.set('toJSON', { getters: true });
commentSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  return obj;
};

const Comments = models.Comments || model('Comments', commentSchema);

export default Comments;
