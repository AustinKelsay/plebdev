import connectMongo from "../../../src/lib/connectMongo";
import Users from "../../../src/models/user";

export default function handler(req, res) {
  // switch the methods
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

// Get user by id
async function getUserByID(req, res) {
  try {
    // connect to mongo
    await connectMongo();

    // get user by id
    const user = await Users.findOne({ _id: req.query.slug });

    // send response
    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Update user
async function updateUser(req, res) {
  try {
    // get the database connection
    await connectMongo();

    // get the user from the request body
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // return the user
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}

// Delete user
async function deleteUser(req, res) {
  try {
    // get the database connection
    await connectMongo();

    // get the user from the request body
    const deletedUser = await Users.findByIdAndDelete(req.params.id);

    // return the user
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}
