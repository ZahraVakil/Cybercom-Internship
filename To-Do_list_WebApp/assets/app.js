// var todoListArray = [];

// function addTask(){
//     var todoTask = document.getElementById('input').value;
//     var toDoObject = {
//         taskId : todoTask.length + 1,
//         taskName : todoTask
//     };

    // todoListArray.push(toDoObject);
//     rendertaskList();
// }

// function rendertaskList(){

//     document.getElementById("taskList").innerHTML =" ";


//     for (var i = 0; i < todoListArray.length; i++) {

//     var dynamicLi = document.createElement("li")
//     dynamicLi.classList.add("task");

//     var myLabel = document.createElement("label");
//     var myPara = document.createElement("p");

//     myPara.textContent = todoListArray[i].taskName;

//     myLabel.appendChild(myPara);
//     dynamicLi.appendChild(myLabel);

//     var myDiv = document.createElement("div");
//     myDiv.classList.add("settings");

//     var editIcon = document.createElement("i");
//     editIcon.classList.add("fa-pen-to-square");
//     editIcon.classList.add("fa-solid");

//     var deleteIcon = document.createElement("i");
//     deleteIcon.classList.add("fa-trash");
//     deleteIcon.classList.add("fa-solid");

//     deleteIcon.addEventListener("click", deleteTask);
//     deleteIcon.taskId = todoListArray[i].taskId;
//     editIcon.addEventListener("click", editTask);
//     editIcon.taskId = todoListArray[i].taskId;

//     myDiv.appendChild(editIcon);
//     myDiv.appendChild(deleteIcon);

//     dynamicLi.appendChild(myDiv);

//     document.getElementById("taskList").appendChild(dynamicLi);

    
// }
// }

// function deleteTask(event){
//     var index = todoListArray.findIndex(i => i.taskId == event.target.taskId);
//     todoListArray.splice(index, 1);
//     rendertaskList();
// }

// function editTask(event){

//


let categories = [
    {
      title: "Personal",
      img: "personal.png",
    },
    {
      title: "Work",
      img: "work.png",
    },
    {
      title: "Shopping",
      img: "shopping.png",
    },
    {
      title: "Coding",
      img: "coding.png",
    },
    // {
    //   title: "Health",
    //   img: "health.png",
    // },
    // {
    //   title: "Fitness",
    //   img: "fitness.png",
    // },
    // {
    //   title: "Education",
    //   img: "education.png",
    // },
    // {
    //   title: "Finance",
    //   img: "finance.png",
    // },
  ];

const CATEGORIES_CONTAINER = document.querySelector(".categories");

const renderCategories = () =>{
    CATEGORIES_CONTAINER.innerHTML = "";
    categories.forEach((category)=>{
        const div = document.createElement("div");
        const link = document.createElement("a");

        link.style.textDecoration = "none"; 
        link.style.color = "black"; 


        div.classList.add("category");
        link.href = `./${category.title.toLowerCase()}.html`;

        div.innerHTML= `<div class="left">
        <img src="./assets/images/${category.img}" alt="${category.title}">
        <div class="content">
        <h1>${category.title}</h1>
        </div>
    </div>` ;

    link.appendChild(div);
    CATEGORIES_CONTAINER.appendChild(link);
    });
}

renderCategories();
  


