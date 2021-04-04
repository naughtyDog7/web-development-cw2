import express from "express"  
import {todosRouter} from "./routes/todoRouter.js"

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set("view engine", "pug");
app.use("/todos", todosRouter);

app.listen(8080, () => {
    console.log(`App is listening on port  http://localhost:8080`);
});