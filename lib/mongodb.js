import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
};

let clientPromise;
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongooseClientPromise) {
    global._mongooseClientPromise = mongoose.connect(uri, options);
  }
  clientPromise = global._mongooseClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = mongoose.connect(uri, options);
}

// Export a module-scoped Mongoose connection promise. By doing this in a
// separate module, the connection can be shared across functions.
export default clientPromise;
