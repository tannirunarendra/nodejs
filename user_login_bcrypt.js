const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const userList = [];
console.log(userList);
app.post("/user/register/page", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }
  if (userList.find((user) => user.username === req.body.username)) {
    return res.status(409).json("user already exists");
  }
  try {
    const password = req.body.password;
    const hashedPass = await bcrypt.hash(password, 10);
    const new_user = {
      username: req.body.username,
      password: hashedPass,
    };
    userList.push(new_user);
    res.status(201).json({ message: "registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Error while registering" });
  }
});

app.post("/user/login/page", async (req, res) => {
  const user = userList.find((user) => user.username === req.body.username);
  if (user == null) {
    return res.status(400).json({ message: "User not found" });
  }
  console.log(userList);
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(201).json({ message: "Login Successfull" });
    } else {
      res.status(400).json({ message: "please enter a valid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while logging in" });
  }
});

app.listen(3050, () => {
  console.log("Server listening on port: ", 3050);
});
