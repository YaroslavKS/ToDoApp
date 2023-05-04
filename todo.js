// Variables
let todoItem = [];
const todoInput = document.querySelector(".todo-input");
const completedTodosDiv = document.querySelector(".completed-todos");
const uncomletedTodosDiv = document.querySelector(".uncompleted-todos");
const audio = new Audio ("sound.mp3");

//Get To Do List on first boot
window.onload = () => {};

//Get the content typed into the input
todoInput.onkeyup((e) => {

})

//Add To Do
function addToDo(text){}

//Remove To Do
function removeToDo(id){}

//Mark as completed
function markAsCompleted(id){}

//Mark as uncompleted
function markAsUnCompleted(id){}

//Save in localstorage
function save(){}

//Render
function render(){}

//Save and Render
function saveAndRender(){
    save()
    render()
}

//Create To Do List item
function createToDoElement(todo){}
