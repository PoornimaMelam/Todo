document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks= JSON.parse(localStorage.getItems('tasks'))

    if(storedTasks) {
        storedTasks.forEach((task)=> tasks.push(task))
        if (tasks[index].completed) {
            taskInput.value = ""; // Clear the input field
            taskInput.placeholder = "Completed tasks cannot be edited"; // Provide a message in the placeholder
            return;
        }
    }
})
let tasks = [];

const saveTasks=()=>
    {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ""}/>
                <p id=${index}>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})"/>
                <img src="./img/delete.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    if (tasks[index].completed) {
        taskInput.value = "";
        return;
    }
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

   document.getElementById('numbers').innerText=`${completeTasks} / ${totalTasks}`;

   if(tasks.length && completeTasks === totalTasks)
    {
        blastConfetti();
    }
};

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});

const blastConfetti = ()=> {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}