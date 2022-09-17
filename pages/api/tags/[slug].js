import connectMongo from "../../../src/lib/connectMongo";
import Tags from "../../../src/models/tag";
import Questions from "../../../src/models/question";

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getTagInfoByName(req, res);
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
