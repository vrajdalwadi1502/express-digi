import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

//add tea
app.post("/teas", (req, res) => {
  //   console.log(req.body);
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//lets find by id
app.get("/teas/:id", (req, res) => {
  //   const { id } = req.params;
  const mytea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!mytea) {
    return res.status(404).send("tea no found");
  }
  res.status(200).send({ mytea, msg: "hi" });
});

//lets update it
app.patch("/teas/:id", (req, res) => {
  const myTea = teaData.find((t) => t.id === parseInt(req.params.id));
  const { name, price } = req.body;
  myTea.name = name;
  myTea.price = price;
  res.status(200).send(myTea);
});

//lets del it
app.delete("/teas/:id", (req, res) => {
  const myTea = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  teaData.splice(myTea, 1);
  res.status(200).send("its deleted");
});
app.listen(port, () => {
  console.log(`server is running at port :${port}`);
});
