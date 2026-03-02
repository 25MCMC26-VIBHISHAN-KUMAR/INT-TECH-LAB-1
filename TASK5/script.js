let tasks = [];
let currentFilter = "all";

function addTask(){
    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("dateInput").value;

    if(text === "" || date === ""){
        alert("Enter task and due date");
        return;
    }

    tasks.push({
        text: text,
        completed: false,
        due: date
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";

    sortTasks();
    displayTasks();
}

function displayTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks.filter(task=>{
        if(currentFilter === "completed") return task.completed;
        if(currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index)=>{
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task.due+": "+task.text;
        if(task.completed) span.classList.add("completed");

        let doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.onclick = ()=>{
            task.completed = true;
            displayTasks();
        };

        let delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.onclick = ()=>{
            tasks.splice(index,1);
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}


function setFilter(type){
    currentFilter = type;
    displayTasks();
}

function sortTasks(){
    tasks.sort((a,b)=>{
        return new Date(a.due) - new Date(b.due);
    });
}
