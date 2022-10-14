import connectMongo from "../../../src/lib/connectMongo";
import Comments from "../../../src/models/comment";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getCommentById(req, res);
    }
    case "PUT": {
      return updateCommentById(req, res);
    }
    case "DELETE": {
      return deleteCommentById(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getCommentById(req, res) {
  try {
    await connectMongo();
    const { slug } = req.query;
    const comment = await Comments.findById(slug);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateCommentById(req, res) {
  try {
    await connectMongo();
    const { slug } = req.query;
    const comment = await Comments.findByIdAndUpdate(slug, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteCommentById(req, res) {
  try {
    await connectMongo();
    const { slug } = req.query;
    const comment = await Comments.findByIdAndDelete(slug);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
