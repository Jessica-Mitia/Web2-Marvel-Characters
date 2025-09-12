import { useState, useEffect } from "react";
import CharacterForm from "./CharacterForm";
import CharacterCard from "./CharacterCard";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [newChar, setNewChar] = useState({ name: "", realName: "", universe: "" });
  const [editingId, setEditingId] = useState(null);
  const [editChar, setEditChar] = useState({ name: "", realName: "", universe: "" });

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    const res = await fetch("http://localhost:3000/characters");
    const data = await res.json();
    setCharacters(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    await fetch("http://localhost:3000/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChar),
    });
    setNewChar({ name: "", realName: "", universe: "" });
    loadCharacters();
  }

  async function handleDelete(id) {
    if (!window.confirm("Want to delete this character?")) return;
    await fetch(`http://localhost:3000/characters/${id}`, { method: "DELETE" });
    loadCharacters();
  }

  function handleEdit(id) {
    const char = characters.find(c => c.id === id);
    setEditingId(id);
    setEditChar({ ...char });
  }

  async function handleUpdate(id) {
    await fetch(`http://localhost:3000/characters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editChar),
    });
    setEditingId(null);
    loadCharacters();
  }

  return (
    <div className="p-6 bg-gray-800 h-screen">
      <h1 className="text-5xl font-bold mb-6 text-red-500">Marvel Characters</h1>

      <CharacterForm character={newChar} setCharacter={setNewChar} onSubmit={handleAdd} submitText="Add" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map(c => (
          <CharacterCard
            key={c.id}
            character={c}
            editingId={editingId}
            editChar={editChar}
            setEditChar={setEditChar}
            onEdit={handleEdit}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onCancel={() => setEditingId(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
