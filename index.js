import express from "express";
import { syncTables } from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js";
import postRouter from "./src/modules/post/post.router.js";

const app = express();

app.use(express.json());

const port = 3000;

await syncTables();

// user APIs
app.use("/user", userRouter);

// post APIs
app.use("/post", postRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
