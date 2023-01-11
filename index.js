import createExpress from "express";
import { USERS_BBDD } from "./bbdd.js";
import path from "path";
import cors from "cors";

const _dirname = path.resolve();

const port = 3000;
const app = createExpress();

app.use(createExpress.json());
app.use(createExpress.text());

app.use(cors());
/*****   REALIZANDO CONSULTAS EN EL JS    *****/

app.get("/account/:id", (req, res) => {
  const { id } = req.params;
  const user = USERS_BBDD.find((user) => user._id === id);
  //realizando la busqueda
  if (!user) res.status(404).send();
  res.send(user);
});

/*****   REALIZANDO BAJAS EN EL JS    *****/

app.delete("/account/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = USERS_BBDD.findIndex((user) => user._id === id);

  if (userIndex === -1) res.status(404).send();

  // Solo se podrá eliminar de a 1 usuario
  USERS_BBDD.splice(userIndex, 1);
  res.send();
});

/*****   REALIZANDO ALTAS EN EL JS    *****/

app.post("/account/", (req, res) => {
  const { _id, name, email, phone, address } = req.body;
  if (!_id || !name) return res.status(404).send; //No es posible encontrar al usuario

  const user = USERS_BBDD.find((user) => user._id === _id);

  if (user) return res.status(409).send(); //existe un conflicto con la consulta

  USERS_BBDD.push({ _id, name, email, phone, address });
  return res.send();
});

/*****   REALIZANDO CAMBIOS EN EL JS    *****/

app.patch("/account/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) return res.status(400).send; //existe un conflicto con la consulta

  const user = USERS_BBDD.find((user) => user._id === id);

  if (!user) res.status(404).send(); //no se encontró al usuario

  user.name = name;
  user.email = email;
  user.phone = phone;
  user.address = address;
  
  return res.send();
});

app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});
