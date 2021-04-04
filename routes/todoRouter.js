import { Router } from "express";
import {TodoValidator} from "../services/validators.js"
import {TodoRepository} from "../repository/repository.js"

const validator = new TodoValidator();
const repository = new TodoRepository();

const router = Router();

function renderAll(res) {
    repository.findAll(
        todos => res.render("all-todos", {todos: todos}),
        err => res.render("all-todos", {todos: null})
    )
}

router.get("/", (req, res) => {
    renderAll(res)
})

router.post("/", (req, res) => {
    if(validator.isValid(req.body)) {
        repository.save(req.body, 
            todo => res.redirect(303, "/todos"), 
            err=> res.redirect(303, "/todos"));
    }
})

export {router as todosRouter}
