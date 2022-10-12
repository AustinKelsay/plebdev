import connectMongo from "../../../../src/lib/connectMongo";
import Answers from "../../../../src/models/answer";

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getAnswersOnQuestion(req, res);
    }
    default: {
      return res.status(405).json({ msg: "Method not allowed" });
    }
  }
}

async function getAnswersOnQuestion(req, res) {
  try {
    await connectMongo();
    const questionId = req.query.slug;
    const answers = await Answers.find({ question_id: questionId });
    res.status(200).json(answers);
  } catch {
    res.status(500).json({ msg: "Something went wrong" });
  }
}
