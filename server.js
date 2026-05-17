const { log, error } = require('console');
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

async function getTasks() {
  const data = await fs.readFile('tasks.json', 'utf-8');
  return JSON.parse(data);
}

async function writeTasks(param) {
  const getTask = await getTasks();
  getTask.push(param);
  const data = await fs.writeFile(
    'tasks.json',
    JSON.stringify(getTask, null, 2),
    'utf-8',
  );
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/reg', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'registration.html'));
});

app.post('/tasks', async (req, res) => {
  const task = req.body;
  console.log(task);

  await writeTasks(task);
  return res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/tasks', async (req, res) => {
  const data = await getTasks();
  res.sendFile(path.join(__dirname, 'pages', 'tasks.html'));
});

app.get('/api/tasks', async (req, res) => {
  const data = await getTasks();
  res.json(data);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
