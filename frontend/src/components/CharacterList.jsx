import { useEffect, useState } from "react";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [newChar, setNewChar] = useState({
    name: "",
    realName: "",
    universe: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editChar, setEditChar] = useState({
    name: "",
    realName: "",
    universe: "",
  });

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    try {
      const res = await fetch("http://localhost:3000/characters");
      const data = await res.json();
      setCharacters(data);
    } catch (error) {
      console.error("Erreur fetch characters:", error);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    console.log("Adding character:", newChar);
    if (!newChar.name) return;

    const res = await fetch("http://localhost:3000/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChar),
    });

    const data = await res.json();
    console.log("Response:", data);

    setNewChar({ name: "", realName: "", universe: "" });
    loadCharacters();
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce personnage ?"
    );
    if (!confirmDelete) return; // l'utilisateur a annulé

    try {
      const res = await fetch(`http://localhost:3000/characters/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Erreur lors de la suppression !");
        return;
      }
      loadCharacters();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression !");
    }
  }

  function handleEdit(id) {
    const char = characters.find((c) => c.id === id);
    setEditingId(id);
    setEditChar({
      name: char.name,
      realName: char.realName,
      universe: char.universe,
    });
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

      <form onSubmit={handleAdd} className="mb-6 flex flex-wrap gap-2">
        <input
          className="border rounded px-2 py-1"
          type="text"
          required
          placeholder="Name"
          value={newChar.name}
          onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
        />
        <input
          className="border rounded px-2 py-1"
          type="text"
          required
          placeholder="Real Name"
          value={newChar.realName}
          onChange={(e) => setNewChar({ ...newChar, realName: e.target.value })}
        />
        <input
          className="border rounded px-2 py-1"
          type="text"
          required
          placeholder="Universe"
          value={newChar.universe}
          onChange={(e) => setNewChar({ ...newChar, universe: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg shadow-md flex flex-col gap-4 text-white bg-gray-900 p-4"
          >
            {editingId === c.id ? (
              <div className="text-gray-500">
                <input
                  className="border rounded px-2 py-1 mb-1 w-full"
                  type="text"
                  value={editChar.name}
                  onChange={(e) =>
                    setEditChar({ ...editChar, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  className="border rounded px-2 py-1 mb-1 w-full"
                  type="text"
                  value={editChar.realName}
                  onChange={(e) =>
                    setEditChar({ ...editChar, realName: e.target.value })
                  }
                  placeholder="Real Name"
                />
                <input
                  className="border rounded px-2 py-1 mb-2 w-full"
                  type="text"
                  value={editChar.universe}
                  onChange={(e) =>
                    setEditChar({ ...editChar, universe: e.target.value })
                  }
                  placeholder="Universe"
                />
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => handleUpdate(c.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl text-red-500 font-semibold">{c.name}</h3>
                <p className="my-2">
                  <b>Real Name:</b> {c.realName}
                </p>
                <p>
                  <b>Universe:</b> {c.universe}
                </p>
                <div className="mt-2 flex justify-between">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(c.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
