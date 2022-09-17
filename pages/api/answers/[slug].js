import connectMongo from '../../../src/lib/connectMongo';
import Answers from '../../../src/models/answer';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getAnswerById(req, res);
        }
        case 'PUT': {
            return updateAnswer(req, res);
        }
        case 'DELETE': {
            return deleteAnswer(req, res);
        }
        default: {
            return res.status(405).json({ msg: 'Method not allowed' });
        }
    }
}

// Get answer by id
async function getAnswerById(req, res) {
    try {
        await connectMongo();
        const answerId = req.query.slug;
        const answer = await Answers.find({"id": answerId});
        res.status(200).json(answer);
    } catch {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

// Update answer
async function updateAnswer(req, res) {
    try {
        await connectMongo();

        const {text} = req.body;

        const answerId = req.query.slug;

        const updatedAnswer = Answers.findByIdAndUpdate(answerId, {text});

        res.status(200).json(updatedAnswer);
    } catch(err) {
        res.status(500).json({ msg: 'Something went wrong', error: err });
    }
}

// Delete answer
async function deleteAnswer(req, res) {
    try {
        await connectMongo();
        
        const answerId = req.query.slug;

        const deletedAnswer = await Answers.findByIdAndDelete(answerId);

        res.status(200).json(deletedAnswer);
    } catch(err) {
        res.status(500).json({ msg: 'Something went wrong', error: err });
    }
}