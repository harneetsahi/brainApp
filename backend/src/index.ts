import "dotenv/config";

import { app } from "./app.js";
import connectDB from "./db/db.connection.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error when listening ", error);
    });

    app.listen(`${process.env.PORT}`);
  })
  .catch((error) => console.log(error, "mongoDB connection failed"));
