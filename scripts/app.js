const addTodoButton = document.getElementById("add-todo"); //the add todo button
const addTodoBar = document.getElementById('add-todo_bar');
const userInput = addTodoBar.querySelector('input'); //the text input field for todo
const backdrop = document.getElementById('backdrop'); // the backdrop
const todoActionModal = document.querySelector('#todo-action_modal');
const alertModal = document.querySelector('#alert-modal');
let allTodo = [];

//closes the alert modal
const closeAlertModal = () => {
    alertModal.classList.remove('visible');
  toggleBackdrop();
}

//opens the alert modal
const openAlertModal = () => {
    alertModal.classList.toggle('visible');
    toggleBackdrop(); // activates the backdrop
    let alertModalCheck = alertModal.querySelector("#alert-moadal-check");
  //  alertModalCheck.replaceWith(alertModal.cloneNode(true));
    //alertModalCheck = alertModal.querySelector("#alert-moadal-check");
    alertModalCheck.addEventListener('click', closeAlertModal.bind(null));
}

//closes the todo-action modal 
const closeTodoActionModal = () => {
    todoActionModal.classList.remove('visible');
}
//function when the user clicks the checked button
const todoDoneAction = (todoId) => {
    let todoIndex = 0;
    for (const todo of allTodo) {
        // console.log(todo);
        if (todo.id == todoId) {
            break;
        }
        todoIndex++;
    }
    // console.log(todoIndex);
    let todo = allTodo[todoIndex].text;
    const listRoot = document.getElementById('tasks_list');
    listRoot.children[todoIndex].innerHTML =
        `
    <p id="todo-text">
        <del>${todo}</del>
    </p>
    `;
    closeTodoActionModal();
    toggleBackdrop();
}
//function when the user clicks the trash button
const removeTodoAction = (id) => {
    let todoIndex = 0;
    for (const todo of allTodo) {
        if (todo.id == id)
            break;
        todoIndex++;
    }
    allTodo.splice(todoIndex, 1);
    const listRoot = document.getElementById('tasks_list');
    listRoot.children[todoIndex].remove();
    closeTodoActionModal();
    toggleBackdrop();
}

//opens the todo-action modal
const startTodoAction = (todoId) => {

    todoActionModal.classList.toggle('visible');
    toggleBackdrop(); // activates the backdrop
    let todoDoneButton = todoActionModal.querySelector("#done-todo");
    todoDoneButton.replaceWith(todoDoneButton.cloneNode(true));
    todoDoneButton = todoActionModal.querySelector("#done-todo");

    let removeTodoButton = todoActionModal.querySelector("#remove-todo");
    removeTodoButton.replaceWith(removeTodoButton.cloneNode(true));
    removeTodoButton = todoActionModal.querySelector("#remove-todo");

    todoDoneButton.addEventListener('click', todoDoneAction.bind(null, todoId));

    removeTodoButton.addEventListener('click', removeTodoAction.bind(null, todoId));

}
//renders new todo
const renderNewTodo = (id, text,date) => {
    const newTodo = document.createElement('li');
    newTodo.classList = "flex flex-row items-center justify-between px-4 py-1 rounded-xl shadow-2xl my-3 bg-red-200";
    newTodo.innerHTML = `
    <div class="flex flex-row items-center">
        <div class="w-8 mr-2 ">
            <img src="https://img.icons8.com/fluency/48/000000/pin.png"/>
        </div>
        <p class="font-mono" id="todo-text">
            ${text}
        </p>
    </div>
    <div>
        ${date}
    </div>
    `;
    newTodo.addEventListener('click', startTodoAction.bind(null, id));
    const listRoot = document.getElementById('tasks_list');
    listRoot.append(newTodo);

}
//adds new todo
const addToList = () => {
    if(userInput.value.length==0) {
        openAlertModal();
        return
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    const todoSet = {
        id: Math.random().toString(),
        text: userInput.value,
        date:today.toString()
    }
    allTodo.push(todoSet);
    renderNewTodo(todoSet.id, todoSet.text,todoSet.date);
    userInput.value = "";
}


//toggles the backdrop
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};
//click handler for backdrop
const backdropClickHandler = () => {
    alertModal.classList.remove('visible');
    closeTodoActionModal();
    toggleBackdrop();
};
addTodoButton.addEventListener('click', addToList);
backdrop.addEventListener('click', backdropClickHandler);
