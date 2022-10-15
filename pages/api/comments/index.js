import connectMongo from "../../../src/lib/connectMongo";
import Comments from "../../../src/models/comment";

export default function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return addComment(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

// Add comment
// verify user middleware
async function addComment(req, res) {
  try {
    await connectMongo();

    const comment = {
      body: req.body.text,
      author: req.body.author,
      answer_id: req.body.answer_id,
    };

    const newComment = await Comments.create(comment);

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
