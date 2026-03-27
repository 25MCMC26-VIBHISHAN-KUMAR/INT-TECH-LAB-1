var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task(text, due) {
        this.text = text;
        this.due = due;
        this.status = TaskStatus.Pending;
    }
    Task.prototype.markCompleted = function () {
        this.status = TaskStatus.Completed;
    };
    return Task;
}());
var tasks = [];
var currentFilter = "all";
var taskInput = document.getElementById("taskInput");
var dateInput = document.getElementById("dateInput");
var taskList = document.getElementById("taskList");
function addTask() {
    var text = taskInput.value;
    var date = dateInput.value;
    if (text === "" || date === "") {
        alert("Enter task and due date");
        return;
    }
    var newTask = new Task(text, date);
    tasks.push(newTask);
    taskInput.value = "";
    dateInput.value = "";
    sortTasks();
    displayTasks();
}
function displayTasks() {
    taskList.innerHTML = "";
    var filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "completed")
            return task.status === TaskStatus.Completed;
        if (currentFilter === "pending")
            return task.status === TaskStatus.Pending;
        return true;
    });
    filteredTasks.forEach(function (task, index) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerText = task.due + ": " + task.text;
        if (task.status === TaskStatus.Completed) {
            span.classList.add("completed");
        }
        var doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.onclick = function () {
            task.markCompleted();
            displayTasks();
        };
        var delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.onclick = function () {
            tasks.splice(index, 1);
            displayTasks();
        };
        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}
function setFilter(type) {
    currentFilter = type;
    displayTasks();
}
function sortTasks() {
    tasks.sort(function (a, b) {
        return new Date(a.due).getTime() - new Date(b.due).getTime();
    });
}
