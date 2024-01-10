function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDate = document.getElementById("dueDate");
    var priority = document.getElementById("priority");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = '<span class="task-text">' + taskInput.value + '</span>' +
                    '<div class="task-details">' +
                        '<span class="due-date">' + formatDate(dueDate.value) + '</span>' +
                        '<span class="priority ' + priority.value.toLowerCase() + '">' + priority.value + '</span>' +
                        '<div class="buttons">' +
                            '<button class="complete-btn" onclick="completeTask(this)">Complete</button>' +
                            '<button class="edit-btn" onclick="editTask(this)">Edit</button>' +
                            '<button class="delete-btn" onclick="deleteTask(this)">Delete</button>' +
                        '</div>' +
                    '</div>';
    taskList.appendChild(li);

    taskInput.value = "";
    dueDate.value = "";
}

function completeTask(btn) {
    var li = btn.parentNode.parentNode;
    li.classList.toggle("completed");
}

function editTask(btn) {
    var li = btn.parentNode.parentNode;
    var taskText = li.querySelector('.task-text');
    var newTaskText = prompt("Edit task:", taskText.innerText);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskText.innerText = newTaskText;
    }
}

function deleteTask(btn) {
    var li = btn.parentNode.parentNode;
    li.parentNode.removeChild(li);
}

function filterTasks(status) {
    var taskList = document.getElementById("taskList");
    var tasks = taskList.getElementsByTagName("li");

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var isCompleted = task.classList.contains("completed");

        if (status === 'all' || (status === 'active' && !isCompleted) || (status === 'completed' && isCompleted)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return '';

    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}
