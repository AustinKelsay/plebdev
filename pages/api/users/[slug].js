import connectMongo from "../../../src/lib/connectMongo";
import Users from "../../../src/models/user";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUserByID(req, res);
    }
    case "PUT": {
      return updateUser(req, res);
    }
    case "DELETE": {
      return deleteUser(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getUserByID(req, res) {
  try {
    await connectMongo();

    const user = await Users.findOne({ _id: req.query.slug });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateUser(req, res) {
  try {
    await connectMongo();

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}

async function deleteUser(req, res) {
  try {
    await connectMongo();

    const deletedUser = await Users.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}
