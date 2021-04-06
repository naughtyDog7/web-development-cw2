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

router.get("/single/:id", (req, res) => {
    repository.findById(req.params.id, (todo) => res.render("single-todo", {todo: todo}));
});

router.get("/:id/delete", (req, res) => {
    repository.deleteById(req.params.id, 
        () => res.redirect(303, "/api/v1/todos"),
        () => res.redirect(303, "/api/v1/todos"))
});

router.get("/new-todo", (req, res) => {
    return res.render("new-todo");
});

router.post("/", (req, res) => {
    if(validator.isValid(req.body)) {
        repository.save(req.body, 
            todo => res.redirect(303, "/api/v1/todos"), 
            err=> res.redirect(303, "/api/v1/todos"));
    } else {
        return res.render("new-todo", {error: true})
    }
})

export {router as todosRouter}
