const data = require("./data");

// Getting all todos
async function getTodos() {
    // Return all todos
    return data;
}

// Getting a single todo
async function getTodo(id) {
    // Get the todo
    const todo = data.find((todo) => todo.id === parseInt(id));
    if (todo) {
        // Return the todo
        return todo;
    } else {
        // Throw an error
        throw new Error(`Todo with id ${id} not found`);
    }
}

// Creating a todo
async function createTodo(todo) {
    // Create a todo, with random id and data sent
    const newTodo = {
        id: Math.floor(4 + Math.random() * 10),
        ...todo,
    };

    // Return the new created todo
    return newTodo;
}

// Updating a todo
async function updateTodo(id) {
    // Get the todo.
    const todo = data.find((todo) => todo.id === parseInt(id));
    // If no todo, throw an error
    if (!todo) {
        throw new Error(`No todo with id ${id} found`);
    }
    // Else, update it by setting completed to true
    todo["completed"] = true;
    // Return the updated todo
    return todo;
}

// Deleting a todo
async function deleteTodo(id) {
    // Get the todo
    const todo = data.find((todo) => todo.id === parseInt(id));
    // If no todo, throw an error
    if (!todo) {
        throw new Error(`No todo with id ${id} found`);
    }
    // Else, return a success message
    return `Todo deleted successfully`;
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};