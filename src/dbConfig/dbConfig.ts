import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    debugger;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running." + err,
      );
      // throw new Error("failed to connect mongodb");
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
    throw new Error("failed to connect");
  }
}
