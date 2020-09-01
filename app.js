const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listener//

todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
document.addEventListener('DOMContentLoaded',getTasks)


// functions//

function getTasks(){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText =task.todo;
    
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
                    //CHECK MARK button//
    const compltedButton = document.createElement("button");
    compltedButton.innerHTML ='<i class="fas fa-check"></i>';
    compltedButton.classList.add("complete-btn")
    todoDiv.appendChild(compltedButton);
    if(task.key==1)
    {
      compltedButton.parentElement.classList.add("completed");
    }
    compltedButton.addEventListener('click',completeTask);

                      //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

                //append to list//

    todoList.appendChild(todoDiv);
  });
}
function addTodo(event){
  event.preventDefault();

  if(todoInput.value=="")
  {
    return false
  }
  else
  {
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText =todoInput.value;
   

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //            Local storage
    storeInLocalStorage(todoInput.value)

                //CHECK MARK button//
    const compltedButton = document.createElement("button");
    compltedButton.innerHTML ='<i class="fas fa-check"></i>';
    compltedButton.classList.add("complete-btn");
    todoDiv.appendChild(compltedButton);
    compltedButton.addEventListener('click',completeTask);

                  //TRASH BUTTON
    trashButton = document.createElement("button");
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

                //append to list//

    todoList.appendChild(todoDiv);

                // IF INPUT IS EMPTY
  todoInput.value="";
  }
}

         // FOR DELETING

function deleteCheck(e){

  const item = e.target;
  //console.log(item)
  if(item.classList[0]==="trash-btn"){
    const todo = item.parentElement;
    todo.classList.add("fall");

    todo.addEventListener("transitionend",function(){
      todo.remove();
      removeTaskFromLs(todo)
    });

  }
}
 // FOR COMPLETED CLASS
function completeTask(e)
{
  const item = e.target;
  //console.log(item)
  const todo =item.parentElement;
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  task = todo
    if(todo.classList.contains("completed")){
      todo.classList.remove("completed")
      tasks.forEach(function(task,index){
        if(todo.textContent===task.todo){
          tasks[index].key = 0
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    else{
      todo.classList.add("completed")
      tasks.forEach(function(task,index){
          if(todo.textContent===task.todo){
            tasks[index].key = 1
          }
      })
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }

}
function removeTaskFromLs(taskItem){
  
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task,index){
      if(taskItem.textContent === task.todo){
        tasks.splice(index,1)
      }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks))
}
function storeInLocalStorage(task){
  
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))

  }
  let obj ={
      todo : task,
      key : 0
  }
  tasks.push(obj)
  
  localStorage.setItem('tasks',JSON.stringify(tasks))

}

