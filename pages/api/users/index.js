import connectMongo from "../../../src/lib/connectMongo";
import Users from "../../../src/models/user";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUsers(req, res);
    }
    case "POST": {
      return addUser(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getUsers(req, res) {
  try {
    await connectMongo();

    const users = await Users.find({});

    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function addUser(req, res) {
  try {
    await connectMongo();

    const name = req.body.username.replace(/\s+/g, "");

    const newUserObject = {
      username: name,
      key: name,
    };

    const userExists = await Users.findOne({ username: name });
    if (userExists) {
      return res.status(200).json({ exists: userExists });
    }

    const newUser = await Users.create(newUserObject);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}
