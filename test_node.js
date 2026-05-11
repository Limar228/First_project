const express = require('express');
const fs = require('fs/promises');

const app = express();

app.use(express.json());

async function getUsers() {
  const data = await fs.readFile('users.json', 'utf-8');
  return JSON.parse(data);
}

async function writeUser(param) {
  const data = await fs.writeFile(
    'users.json',
    JSON.stringify(param, null, 2),
    'utf-8',
  );
}

app.get('/users', async (req, res) => {
  const data = await getUsers();
  res.status(200).json(data);
});

app.post('/users', async (req, res) => {
  const newUser = req.body;
  const data = await getUsers();
  const exists = data.some((user) => user.id === newUser.id); //перебор массива говно

  if (!exists) {
    if (typeof newUser.id === 'number' && typeof newUser.name === 'string') {
      data.push(newUser);

      await writeUser(data);
      return res.status(201).json({
        message: 'Created',
        user: newUser,
      });
    }
  }
  return res.status(400).json({
    message: 'Вы ввели не правильный запрос',
  });
});

app.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  let data = await getUsers();
  data = data.filter((user) => user.id !== id);
  await writeUser(data);
  res.status(200).json({
    message: 'Пользователь удалён',
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
