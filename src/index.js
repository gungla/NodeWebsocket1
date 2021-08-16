import express from "express";
import path from "path";
import * as http from "http";
import io from "socket.io";
import { productos } from "./class";

const app = express();
const port = 8080;

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const myServer = http.Server(app);
myServer.listen(port, () => console.log("Server Up en puerto", port));

//Endpoint Home abriendo index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html", { productos });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html", { productos });
});

app.post("/guardar", (req, res) => {
  const body = req.body;

  if (body == undefined) {
    return res.status(400).json({
      Error: "ERROR, no se gurdo el producto",
    });
  }

  const newProduct = {
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
    id: productos.length + 1,
  };

  productos.push(newProduct);

  res.status(201).sendFile(__dirname + "/public/index.html", { productos });
});

const ioServer = io(myServer);

ioServer.on("connection", (socket) => {
  console.log("Se conecto un cliente nuevo");
  ioServer.emit("messages", productos);
});
