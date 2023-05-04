// Variables
let todoItem = [];
const todoInput = document.querySelector(".todo-input");
const completedTodosDiv = document.querySelector(".completed-todos");
const uncomletedTodosDiv = document.querySelector(".uncompleted-todos");
const audio = new Audio ("sound.mp3");

//Get To Do List on first boot
window.onload = () => {
    let storageToDoItem = localStorage.getItem("todoItem")
    if(storageToDoItem !== null){
        todoItem = JSON.parse(storageToDoItem)
    }
    render()
};

//Get the content typed into the input
todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/, "")
    if (value && e.keyCode === 13){//Enter
        addToDo(value)

        todoInput.value = ""
        todoInput.focus()
    }
})

//Add To Do
function addToDo(text){
    todoItem.push({
        id: Date.now(),
        text,
        completed: false
    })
    saveAndRender()
}

//Remove To Do
function removeToDo(id){
    todoItem = todoItem.filter(todo => todo.id !== Number(id))
    saveAndRender()
}

//Mark as completed
function markAsCompleted(id){
    todoItem = todoItem.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = true
        }
        return todo
    })
    audio.play()
    saveAndRender()
}

//Mark as uncompleted
function markAsUnCompleted(id){
    todoItem = todoItem.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = false
        }
        return todo
    })
    saveAndRender()
}

//Save in localstorage
function save(){
    localStorage.setItem("todoItem", JSON.stringify(todoItem))
}

//Render
function render(){
    let uncomletedTodos = todoItem.filter(item => !item.completed)
    let completedTodos = todoItem.filter(item => item.completed)
    completedTodosDiv.innerHTML = ""
    uncomletedTodosDiv.innerHTML = ""
    if(uncomletedTodos.length > 0){
        uncomletedTodos.forEach(todo => {
            uncomletedTodosDiv.append(createToDoElement(todo))
        })
    }else{
        uncomletedTodosDiv.innerHTML = `<div class = "empty">No uncompleted ToDos</div>`
    }
    if(completedTodos.length > 0){
        completedTodosDiv.innerHTML = `<div class = "completed-title">Completed (${completedTodos.length} / ${todoItem.length})</div>`
        completedTodos.forEach(todo =>{
            completedTodosDiv.append(createToDoElement(todo))
        })
    }   
}

//Save and Render
function saveAndRender(){
    save()
    render()
}

//Create To Do List item
function createToDoElement(todo){
    //Create To Do List container
    const todoDiv = document.createElement("div")
    todoDiv.setAttribute("data-id", todo.id)
    todoDiv.className = "todo-item"

    //Create To Do Item text
    const todoTextSpan = document.createElement("span")
    todoTextSpan.innerHTML = todo.text

    //Checkbox for list
    const todoInputCheckBox = document.createElement("input")
    todoInputCheckBox.type = "checkbox"
    todoInputCheckBox.checked = todo.completed
    todoInputCheckBox.onclick = (e) => {
        let id = e.target.closest(".todo-item").dataset.id
        e.target.checked ? markAsCompleted(id) : markAsUnCompleted(id)
    }
    
    //Deleted button for list
    const todoRemoveBtn = document.createElement("a")
    todoRemoveBtn.href = "#"
    todoRemoveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M18 6l-12 12"></path>
                                <path d="M6 6l12 12"></path>
                               </svg>`
    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest(".todo-item").dataset.id
        removeToDo(id)
    }
    todoTextSpan.prepend(todoInputCheckBox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)
    return todoDiv
}
