const button = document.querySelector('#todo-form button');
const input = document.querySelector('#todo-form input');
const buttonEdit = document.querySelector('#edit-form button');
const inputEdit = document.querySelector('#edit-form input');
const toDoListContainer = document.getElementById('todo-list');

const editForm = document.querySelector("#edit-form");
const todoForm = document.querySelector("#todo-form");
const toolbar = document.querySelector("#toolbar");
const cancelBtn = document.querySelector("#cancel-edit-btn");

let myList = [];



function showToDo(){

    let newToDo = '';

    myList.forEach((item, index) => {
        
        if(item.text){
             newToDo =  newToDo + `
               <div class="todo ${item.done && "done"}">
                  <h3>${item.text}</h3>
                  <button class="finish-todo" onclick="finishToDo(${index})"><i class="fa-solid fa-check"></i></button>
                  <button class="edit-todo" onclick="editToggle(${index})"><i class="fa-solid fa-pen"></i></button>
                  <button class="remove-todo" onclick="deleteToDo(${index})"><i class="fa-solid fa-xmark"></i></button>
               </div>
            `
        }
    })


    toDoListContainer.innerHTML = newToDo; 

    localStorage.setItem('list', JSON.stringify(myList));

}



function finishToDo(index){

    myList[index].done = !myList[index].done;
    showToDo();  
}

function editToggle(index){
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    toDoListContainer.classList.toggle("hide");
    toolbar.classList.toggle("hide");

    inputEdit.value = myList[index].text;

    buttonEdit.addEventListener("click", (e) => {
        e.preventDefault();
    
        myList[index].text = inputEdit.value;

        editForm.classList.toggle("hide");
        todoForm.classList.toggle("hide");
        toDoListContainer.classList.toggle("hide");
        toolbar.classList.toggle("hide");

        showToDo();
    })
}



function deleteToDo(index){
    myList.splice(index, 1);

    showToDo();
}


function localList(){
    const itemLocalList = localStorage.getItem('list');

    if(itemLocalList){
        myList = JSON.parse(itemLocalList)
    }

    showToDo();
}

localList()

button.addEventListener('click', (e) =>{
    e.preventDefault();

    if(input.value !== ''){
        myList.push({
            text: input.value,
            done: false
        });

        input.value ='';
        input.focus();
        showToDo();
        console.log(myList)
    }
})