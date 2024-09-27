// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const toolbar = document.querySelector("#toolbar");

let oldInputValue;
let myList = [];

// Funções

/* Adicionar to do */
function saveTodo(text, addToList = true) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    if (addToList) {
        updateList(text);
        localStorage.setItem('list', JSON.stringify(myList));
    }

    todoInput.value = "";
    todoInput.focus();
}

function updateList(item) {
    myList.push(item);
}


function reloadList() {

    const localStorageList = localStorage.getItem('list');

    if (localStorageList) {
        const loadedList = JSON.parse(localStorageList);

        loadedList.forEach((item) => {
            saveTodo(item, false);
        });
        myList = loadedList;
    }
}


function toggleForms() {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    toolbar.classList.toggle("hide");
}


function updateTodo(text) {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            const index = myList.indexOf(oldInputValue);
            if (index !== -1) {
                myList[index] = text;
                localStorage.setItem('list', JSON.stringify(myList));
            }
        }
    });
}

// Eventos

/* Adicionar to do */
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

/* Botoes no to do */
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");

    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();

        const index = myList.indexOf(todoTitle);
        if (index !== -1) {
            myList.splice(index, 1);
            localStorage.setItem('list', JSON.stringify(myList));
        }
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

});


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});


editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});


reloadList()