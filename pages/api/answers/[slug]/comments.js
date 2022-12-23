import connectMongo from "../../../../src/lib/connectMongo";
import Comments from "../../../../src/models/comment";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getCommentsByAnswerId(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getCommentsByAnswerId(req, res) {
  try {
    await connectMongo();
    const { slug } = req.query;
    const comments = await Comments.find({ answer_id: slug });

    if (!comments) {
      return res.status(404).json({ error: "Comments not found" });
    }
    return res.status(200).json(comments);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
