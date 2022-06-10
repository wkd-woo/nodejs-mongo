const express = require("express");
const app = express();

const users = [];

app.use(express.json());

app.get("/user", function (req, res) {
  // 기본 폼
  return res.send({ users: users });
});

app.post("/user", (req, res) => {
  // arrow function
  console.log(req.body);

  users.push({ name: req.body.name, age: req.body.age });
  return res.send({ success: true });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
