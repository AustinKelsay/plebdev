import connectMongo from "../../../src/lib/connectMongo";
import Answers from "../../../src/models/answer";
import Votes from "../../../src/models/vote";

export default function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return upvote(req, res);
    }
    case "PUT": {
      return unvote(req, res);
    }
    case "DELETE": {
      return downvote(req, res);
    }
    default: {
      return res.status(405).json({ msg: "Method not allowed" });
    }
  }
}

const upvote = async (req, res) => {
  try {
    await connectMongo();

    // const answer = await Answers.find({ id: parentId });
    // const answerLength = answer.votes.length;

    const vote = await Votes.create(req.body);

    res.status(201).json(vote);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
};

const downvote = async (req, res) => {
  try {
    await connectMongo();

    const user = req.body.user;
    const parentId = req.body.answerId;
    const answer = await Answers.findById(parentId);

    const voteObj = {
      user: user,
      vote: answer.votes.length - 1,
      parentId: parentId,
    };
    const vote = await Votes.create(voteObj);
    res.status(201).json(vote);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
};

const unvote = async (req, res) => {
  try {
    await connectMongo();

    const user = req.body.user;
    const parentId = req.body.answerId;
    const answer = await Answers.findById(parentId);

    const vote = await Votes.findOne({ user: user, parentId: parentId });
    await vote.remove();

    answer.votes = answer.votes.filter((vote) => vote.user !== user);
    res.status(200).json({ msg: "Vote removed" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
};
