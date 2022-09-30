import connectMongo from "../../../src/lib/connectMongo";
import Questions from "../../../src/models/question";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getQuestions(req, res);
    }
    case "POST": {
      return addQuestion(req, res);
    }
    default: {
      return res.status(405).json({ msg: "Method not allowed" });
    }
  }
}

// Get all questions
async function getQuestions(req, res) {
  try {
    await connectMongo();

    const questions = await Questions.find({});

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
}
// Add question
async function addQuestion(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    await connectMongo();

    const newQuestion = await Questions.create(req.body);

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
}
