export class TodoValidator {
    isValid(todo) {
        return todo.value.trim() !== "" && todo.title.trim() !== ""; 
    }
}
