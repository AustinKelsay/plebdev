import connectMongo from "../../../../src/lib/connectMongo";
import Questions from "../../../../src/models/question";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getQuestionById(req, res);
    }
    case "PUT": {
      return updateQuestion(req, res);
    }
    case "DELETE": {
      return deleteQuestion(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getQuestionById(req, res) {
  try {
    await connectMongo();

    let question = await Questions.findById(req.query.slug);

    const formattedDate = new Date(question.created).toLocaleDateString();

    const formattedQuestion = {
      id: question.id,
      title: question.title,
      description: question.description,
      author: question.author,
      tags: question.tags,
      score: question.score,
      views: question.views,
      created: formattedDate,
    };

    res.status(200).json(formattedQuestion);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateQuestion(req, res) {
  try {
    await connectMongo();

    let paramsToUpdate = {};

    if (req.body.score) {
      paramsToUpdate = { ...paramsToUpdate, $inc: { score: req.body.score } };
    } else if (req.body.answersCount) {
      paramsToUpdate = {
        ...paramsToUpdate,
        $inc: { answersCount: req.body.answersCount },
      };
    } else if (req.body.views) {
      paramsToUpdate = {
        ...paramsToUpdate,
        $inc: { views: req.body.views },
      };
    } else {
      paramsToUpdate = { ...paramsToUpdate, ...req.body };
    }

    const updatedQuestion = await Questions.findByIdAndUpdate(
      req.query.slug,
      paramsToUpdate,
      { new: true }
    );

    res.status(200).json(updatedQuestion);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteQuestion(req, res) {
  try {
    await connectMongo();

    const deletedQuestion = await Questions.findByIdAndDelete(req.query.slug);

    res.status(200).json(deletedQuestion);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}
