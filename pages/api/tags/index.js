import connectMongo from "../../../src/lib/connectMongo";
import Tags from "../../../src/models/tags";

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getAllTags(req, res);
    }
    case "POST": {
      return addTags(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

// Get all tags
async function getAllTags(req, res) {
  try {
    await connectMongo();

    const tags = await Tags.find({});

    res.status(200).json(tags);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Add tag
async function addTags(req, res) {
  try {
    await connectMongo();

    if (req.body.tags) {
      const newTags = req.body.tags.map((tag) => {
        return { name: tag, parent: req.body.parent };
      });

      const savedTags = await Tags.insertMany(newTags);

      res.status(201).json(savedTags);
    } else {
      res.status(200).json({ msg: "No tags to save" });
    }

    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}
