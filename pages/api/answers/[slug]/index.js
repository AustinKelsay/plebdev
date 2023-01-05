import connectMongo from "../../../../src/lib/connectMongo";
import Answers from "../../../../src/models/answer";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getAnswerById(req, res);
    }
    case "PUT": {
      return updateAnswer(req, res);
    }
    case "DELETE": {
      return deleteAnswer(req, res);
    }
    default: {
      return res.status(405).json({ msg: "Method not allowed" });
    }
  }
}

async function getAnswerById(req, res) {
  try {
    await connectMongo();
    const answerId = req.query.slug;
    const answers = await Answers.find({ _id: answerId });
    res.status(200).json(answers);
  } catch {
    res.status(500).json({ msg: "Something went wrong" });
  }
}

async function updateAnswer(req, res) {
  try {
    await connectMongo();

    const answerId = req.query.slug;

    let paramsToUpdate = {};

    if (req.body.text) {
      paramsToUpdate = { ...paramsToUpdate, text: req.body.text };
    } else if (req.body.votes) {
      paramsToUpdate = { ...paramsToUpdate, $inc: { votes: req.body.votes } };
    }

    const updatedAnswer = await Answers.findByIdAndUpdate(
      answerId,
      paramsToUpdate,
      { new: true }
    );

    res.status(200).json(updatedAnswer);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
}

async function deleteAnswer(req, res) {
  try {
    await connectMongo();

    const answerId = req.query.slug;

    const deletedAnswer = await Answers.findByIdAndDelete(answerId);

    res.status(200).json(deletedAnswer);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
}
