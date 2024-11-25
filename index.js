const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//ADD NEW TASKS

function addNewTask(tasks, taskId, text, priority) {
  tasks.push({
    taskId,
    text,
    priority,
  });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = req.query.priority;

  let result = addNewTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

//READ ALL TASKS

function getAllTasks() {
  return tasks;
}

app.get('/tasks', (req, res) => {
  let result = getAllTasks();
  res.json({ tasks: result });
});

// SORT TASKS BY PRIORITY

function sortByPriority(tasks1, tasks2) {
  return tasks1.priority - tasks2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortByPriority);
  res.json({ tasks: result });
});

// EDIT PRIORITY

function findAndUpdate(tasks, taskId, priority) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }

  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = req.query.priority;

  let result = findAndUpdate(tasks, taskId, priority);
  res.json({ tasks: result });
});

// EDIT TEXT

function findAndUpdateText(tasks, taskId, text) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }

  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = findAndUpdateText(tasks, taskId, text);
  res.json({ tasks: result });
});

// DELETE TASK

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((task) => task.taskId !== taskId);
  res.json({ tasks: result });
});

// Filter TASK by priority

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => task.priority === priority);
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
