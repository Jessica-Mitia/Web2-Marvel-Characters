const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, 'user.json');

app.use(express.json());

function readUsers() {
  const data = fs.readFileSync(dataFile, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.characters;
}

function writeUsers(usersArray) {
  const newData = { characters: usersArray };
  fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2), 'utf-8');
}

app.get('/characters', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.get('/characters/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Character not found' });
  res.json(user);
});

app.post('/characters', (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    realName: req.body.realName,
    universe: req.body.universe
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

app.put('/characters/:id', (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Character not found' });

  users[index].name = req.body.name || users[index].name;
  users[index].realName = req.body.realName || users[index].realName;
  users[index].universe = req.body.universe || users[index].universe;

  writeUsers(users);
  res.json(users[index]);
});

app.delete('/characters/:id', (req, res) => {
  const users = readUsers();
  const filtered = users.filter(u => u.id !== parseInt(req.params.id));
  if (filtered.length === users.length)
    return res.status(404).json({ message: 'Character not found' });

  writeUsers(filtered);
  res.json({ message: 'Character deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});