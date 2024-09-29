const button = document.querySelector('#todo-form button');
const input = document.querySelector('#todo-form input');
const toDoListContainer = document.getElementById('todo-list');

let myList = [];



function showToDo() {

    let newToDo = '';
    let hasText = false;

    myList.forEach((item, index) => {
        if (item.text) {
            hasText = true;
            newToDo = newToDo + `
                <div class="todo ${item.done && "done"}">
                   <h3>${item.text}</h3>
                   <button class="finish-todo" onclick="finishToDo(${index})"><i class="fa-solid fa-check"></i></button>
                   <button class="edit-todo"><i class="fa-solid fa-pen"></i></button>
                   <button class="remove-todo" onclick="deleteToDo(${index})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
        }
    });


    if (hasText) {
        
    }

    localStorage.setItem('list', JSON.stringify(myList));
}


function deleteToDo(index){
    myList.splice(index, 1);

    showToDo();
}

function finishToDo(index){

    myList[index].done = !myList[index].done;
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
    }

    input.value ='';
    input.focus();
    showToDo();
    console.log(myList)
})