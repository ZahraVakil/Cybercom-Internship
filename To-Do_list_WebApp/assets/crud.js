const todoTask = document.getElementById('input');
const prioritySelect = document.getElementById('priority');
const scheduleTask = document.getElementById('schedule');
const categoryTitle = document.getElementById('catergoryTitle').textContent;
const taskContainer = document.getElementById('taskContainer');
const error = document.getElementById('error');
const countValue = document.querySelector('.count-value');
const addBtn = document.getElementById('add-btn');
const editBtn = document.getElementById('edit-btn');
const clearall = document.getElementById('clear-all');
var todoListArray = [];

console.log(categoryTitle);

// const taskCount = 0;

// const displyCount = (taskCount) =>{
    
// }

function sortTaskList(){
    todoListArray.sort((task1, task2) => {
        return task1.prioritySelect - task2.prioritySelect;
    });
}

const filterSelect = document.getElementById("filterSelect");

filterSelect.addEventListener("change", () => {
  rendertaskList();
});

function addTask(){
    const TaskName = todoTask.value.trim();
    error.style.display = 'none';

    if(!TaskName){
        setTimeout(() =>{
            error.style.display = "block";
        }, 200);
        return;
    }
    var toDoObject = {
        taskId : Date.now(),
        taskName : todoTask.value.trim(),
        dueDate: scheduleTask.value,
        createDate: new Date(),
        category: categoryTitle,
        status: 'pending',
        prioritySelect: prioritySelect.value

    };

    todoListArray.push(toDoObject);
    rendertaskList();
    todoTask.value= "";
    scheduleTask.value="";
    prioritySelect.value="";
    storeTasks();
}
function getPriorityColor(priority) {
    switch (priority) {
        case '-1':
            return 'black';
        case '1':
            return 'red';
        case '2':
            return 'orange';
        case '3':
            return 'black';
        default:
            return 'black';
    }
}


function rendertaskList(){
    sortTaskList();
    
    taskContainer.innerHTML = "";

    let currentFilter = filterSelect.value;

    // console.log(currentFilter);

    todoListArray.forEach(task =>{

        if (task.category === categoryTitle) {

        if (currentFilter !== "-1" && currentFilter !== task.prioritySelect) {
                return;
            }
        
            
        const tasks = document.createElement("div");
        tasks.classList.add("task-list");

        
        let dueDate = task.dueDate || "No due date";
        
        const taskColor = getPriorityColor(task.prioritySelect); 
 
        tasks.innerHTML=`
        <div class="task">
                <span class="taskName" style="color: ${taskColor};">${task.taskName} <h6 class="due-date">Due Date: ${dueDate}</h6></span>
                <button class="edit" onclick= "editTask(${task.taskId})"> <i class="fa-regular fa-pen-to-square" ></i></button>
                <button class="delete" onclick= "deleteTask(${task.taskId})" ><i class="fa-solid fa-trash"></i></button>
                </div>`

              
        taskContainer.appendChild(tasks);
    }
    })


}


function deleteTask(taskId){
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if(confirmDelete){
        const taskIndex = todoListArray.findIndex(task => task.taskId == taskId);

        todoListArray.splice(taskIndex, 1);
    
        storeTasks();
        rendertaskList();
    }
   rendertaskList();
 }


function editTask(taskId) {
        const taskIndex = todoListArray.findIndex(task => task.taskId == taskId);
        const task = todoListArray[taskIndex];
        todoTask.value = task.taskName;

        scheduleTask.value = task.dueDate;
        prioritySelect.value = task.prioritySelect;
    
        editBtn.onclick = function() {
            updateTask(taskIndex);
        };
    
        editBtn.style.display = 'inline-block';
        addBtn.style.display = 'none';
    }

function updateTask(taskIndex) {
        if (todoTask.value.trim() === '') {
            setTimeout(() =>{
                error.style.display = "block";
            }, 200);           
             return;
        }
        todoListArray[taskIndex].taskName = todoTask.value.trim();
        todoListArray[taskIndex].scheduleTask = scheduleTask.value;
        todoListArray[taskIndex].prioritySelect = prioritySelect.value;

        rendertaskList();
        todoTask.value = '';
        scheduleTask.value = '';
        prioritySelect.value="";

        editBtn.style.display = 'none';
        addBtn.style.display = 'inline-block';
        storeTasks();
    }

function clearAll() {
        const confirmClear = confirm("Are you sure you want to clear all tasks in this category?");
        if (confirmClear) {
            todoListArray = todoListArray.filter(task => task.category !== categoryTitle);
            storeTasks();
            rendertaskList();
        }
    }
    
 

function storeTasks() {
    sortTaskList();
    localStorage.setItem('tasks', JSON.stringify(todoListArray));
}

function displayData() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        todoListArray = JSON.parse(storedTasks);
        rendertaskList();
    
    }
}

displayData();