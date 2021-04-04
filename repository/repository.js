import {root} from "../utils.js"
import {join} from "path"
import {readFile, writeFile} from "fs"

export class TodoRepository {
    constructor() {
        this.todosPath = join(root, 'data/todos.json')
        this.todoCounter = 0;
        this.updateTodoCounter();
    }

    updateTodoCounter() {
        readFile(this.todosPath, "utf8", (err, json) => {
            if(err) {
                printError(err);
                onError(err)
                return
            }
            const todos = JSON.parse(json);
            const maxId = Math.max.apply(Math, todos.map(t => t.id));
            this.setTodoCounter(maxId)
        });
    }

    setTodoCounter(counter) {
        this.todoCounter = counter;
    }

    printError(err) {
        console.error(err);
    }

    findById(id, onSuccess, onError) {
        readFile(this.todosPath, "utf8", (err, json) => {
            if(err) {
                printError(err);
                onError(err)
                return
            }
            const todos = JSON.parse(json);
            const todo = todos.filter(t => t.id == id)[0]
            onSuccess(todo)
        });
    }

    findAll(onSuccess, onError) {
        readFile(this.todosPath, "utf8", (err, json) => {
            if(err) {
                printError(err);
                onError(err)
                return
            }
            const todos = JSON.parse(json);
            onSuccess(todos);
        });
    }

    save(todo, onSuccess, onError) {
        readFile(this.todosPath, "utf8", (err, json) => {
            if(err) {
                printError(err);
                onError(err)
                return
            }
            const todos = JSON.parse(json);
            todo.id = this.generateId()
            todos.push(todo);

            writeFile(this.todosPath, JSON.stringify(todos), err => {
                if(err) {
                    printError(err);
                    onError(err);
                } else {
                    onSuccess(todo);
                }
            })
        });
    }

    deleteById(id, onSuccess, onError) {
        readFile(this.todosPath, "utf8", (err, json) => {
            if(err) {
                printError(err);
                onError(err)
                return
            }
            const todos = JSON.parse(json);
            todos = todos.filter(todo => todo.id !== id) || [];

            writeFile(this.todosPath, JSON.stringify(todos), err => {
                if(err) {
                    printError(err);
                    onError(err);
                } else {
                    onSuccess(todo);
                }
            })
        });
    }

    generateId() {
        return ++this.todoCounter;
    }
}