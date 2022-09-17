import connectMongo from '../../../src/lib/connectMongo';
import Questions from '../../../src/models/question';
import Answers from '../../../src/models/answer';

export default function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'POST': {
            return addAnswer(req, res);
        }
        default: {
            return res.status(405).json({ msg: 'Method not allowed' });
        }
    }
}

    // Add answer
    async function addAnswer(req, res) {
        try {
            await connectMongo();

            const {author, text, question_id} = req.body;

            const answerToSave = {
                author,
                text,
                question_id
            };

            const answer = await Answers.create(answerToSave);
            res.status(200).json(answer);

        } catch(err) {
            res.status(500).json({ msg: 'Something went wrong', error: err });
        }
    }