import {root} from "../utils.js"
import {join} from "path"
import {readFile, writeFile} from "fs"

export class TodoRepository {
    constructor() {
        this.todosPath = join(root, 'data/todos.json')
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
            if(todos.length === 0) {
                this.todoCounter = 0;
            } else {
                const maxId = Math.max.apply(Math, todos.map(t => t.id));
                this.todoCounter = maxId
            }
            console.log(`Max id ${this.todoCounter}`)
        });
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
            let todos = JSON.parse(json);
            let filteredTodos = todos.filter(todo => parseInt(todo.id) !== parseInt(id)) || [];
            writeFile(this.todosPath, JSON.stringify(filteredTodos), err => {
                if(err) {
                    printError(err);
                    onError(err);
                } else {
                    onSuccess();
                }
            })
        });
    }

    generateId() {
        return ++this.todoCounter;
    }
}