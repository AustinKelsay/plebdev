import connectMongo from "../../../src/lib/connectMongo";
import Tags from "../../../src/models/tags";
import Questions from "../../../src/models/question";

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getTagInfoByName(req, res);
    }
    case "PUT": {
      return updateTagById(req, res);
    }
    case "DELETE": {
      return deleteTagById(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getTagInfoByName(req, res) {
  try {
    // connect to mongo
    await connectMongo();

    const count = await Tags.countDocuments({ name: req.query.name });

    const parentIds = await Tags.find({ name: req.query.name }).select(
      "parent"
    );

    const taggedQuestions = await Questions.findAllById(parentIds);

    // send response
    res.status(200).json({ count, taggedQuestions });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateTagById(req, res) {
  try {
    // connect to mongo
    await connectMongo();

    // update tag
    const updatedTag = await Tags.findByIdAndUpdate(req.query.slug, req.body, {
      new: true,
    });

    // send response
    res.status(200).json(updatedTag);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteTagById(req, res) {
  try {
    // connect to mongo
    await connectMongo();

    const deletedTag = await Tags.findByIdAndDelete(req.query.slug);

    res.status(200).json(deletedTag);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}
