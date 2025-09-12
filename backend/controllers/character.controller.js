import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "../data/user.json");

function readUsers() {
  const data = fs.readFileSync(dataFile, "utf-8");
  const parsed = JSON.parse(data);
  return parsed.characters;
}

function writeUsers(usersArray) {
  const newData = { characters: usersArray };
  fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2), "utf-8");
}

export const getAllCharacters = (req, res) => {
  const users = readUsers();
  res.json(users);
};

export const getCharacterById = (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Character not found" });
  res.json(user);
};

export const createCharacter = (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    realName: req.body.realName,
    universe: req.body.universe,
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};

export const updateCharacter = (req, res) => {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Character not found" });

  users[index].name = req.body.name || users[index].name;
  users[index].realName = req.body.realName || users[index].realName;
  users[index].universe = req.body.universe || users[index].universe;

  writeUsers(users);
  res.json(users[index]);
};

export const deleteCharacter = (req, res) => {
  const users = readUsers();
  const filtered = users.filter((u) => u.id !== parseInt(req.params.id));
  if (filtered.length === users.length)
    return res.status(404).json({ message: "Character not found" });

  writeUsers(filtered);
  res.json({ message: "Character deleted" });
};
