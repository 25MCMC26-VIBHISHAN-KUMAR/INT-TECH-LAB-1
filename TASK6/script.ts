enum TaskStatus {
    Pending,
    Completed
}

class Task {
    text: string;
    due: string;
    status: TaskStatus;

    constructor(text: string, due: string) {
        this.text = text;
        this.due = due;
        this.status = TaskStatus.Pending;
    }

    markCompleted(): void {
        this.status = TaskStatus.Completed;
    }
}

let tasks: Task[] = [];

let currentFilter: "all" | "completed" | "pending" = "all";

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const dateInput = document.getElementById("dateInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function addTask(): void {
    const text: string = taskInput.value;
    const date: string = dateInput.value;

    if (text === "" || date === "") {
        alert("Enter task and due date");
        return;
    }

    const newTask = new Task(text, date);
    tasks.push(newTask);

    taskInput.value = "";
    dateInput.value = "";

    sortTasks();
    displayTasks();
}

function displayTasks(): void {
    taskList.innerHTML = "";

    const filteredTasks: Task[] = tasks.filter((task: Task) => {
        if (currentFilter === "completed") return task.status === TaskStatus.Completed;
        if (currentFilter === "pending") return task.status === TaskStatus.Pending;
        return true;
    });

    filteredTasks.forEach((task: Task, index: number) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = task.due + ": " + task.text;

        if (task.status === TaskStatus.Completed) {
            span.classList.add("completed");
        }

        const doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.onclick = () => {
            task.markCompleted();
            displayTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });
}

function setFilter(type: "all" | "completed" | "pending"): void {
    currentFilter = type;
    displayTasks();
}

function sortTasks(): void {
    tasks.sort((a: Task, b: Task) => {
        return new Date(a.due).getTime() - new Date(b.due).getTime();
    });
}
