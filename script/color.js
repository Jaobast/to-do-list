const todoContainer = document.querySelector(".todo-container");
const changeContainer = document.querySelector(".change-container");
const changeColorBtn = document.querySelector("#change-color-btn");

function changeColor() {
    todoContainer.classList.toggle("hide");
    changeContainer.classList.toggle("hide");

    if(changeColorBtn.innerText === "Change theme"){
        changeColorBtn.innerText = "To do List";
    }else{
        changeColorBtn.innerText = "Change theme"
    }
}
