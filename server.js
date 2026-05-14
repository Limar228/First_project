const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); // важно!

async function getUsers() {
  const data = await fs.readFile("users.json", "utf-8");
  return JSON.parse(data);
}

async function writeUser(param) {
  const data = await fs.writeFile(
    "users.json",
    JSON.stringify(param, null, 2),
    "utf-8",
  );
}

//сервер видет глав стр и отдает index.html, а там видит css
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/reg", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "registration.html"));
});

app.post("/login", async (req, res) => {
  const newUser = req.body;
  const data = await getUsers();
  await writeUser(data);
  return res.status(201).json({
    message: "Created",
    user: newUser,
  });
});

app.get("/tasks", async (req, res) => {
  const data = await getUsers();
  res.sendFile(path.join(__dirname, "pages", "tasks.html"));
});

app.get("/api/users", async (req, res) => {
  const data = await getUsers();
  res.json(data);
});

app.get("/users", async (req, res) => {
  // Это коллбек отрабатывает по маршруту

  const data = await getUsers();
  console.log(data);

  res.status(200).json(data);
});

app.post("/users", async (req, res) => {
  const newUser = req.body;
  const data = await getUsers();
  const exists = data.some((user) => user.id === newUser.id); //перебор массива говно

  if (!exists) {
    if (typeof newUser.id === "number" && typeof newUser.name === "string") {
      data.push(newUser);

      await writeUser(data);
      return res.status(201).json({
        message: "Created",
        user: newUser,
      });
    }
  }
  return res.status(400).json({
    message: "Вы ввели не правильный запрос",
  });
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  let data = await getUsers();
  data = data.filter((user) => user.id !== id);
  await writeUser(data);
  res.status(200).json({
    message: "Пользователь удалён",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
