import "dotenv/config";
import { app } from "./app";
import connectDB from "./db/db.connection";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error when listening ", error);
    });

    app.listen(`${process.env.PORT}`);
  })
  .catch((error) => console.log(error, "mongoDB connection failed"));
