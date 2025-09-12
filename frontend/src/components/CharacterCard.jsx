function CharacterCard({ character, editingId, editChar, setEditChar, onEdit, onUpdate, onDelete, onCancel }) {
  return (
    <div className="border rounded-lg shadow-md flex flex-col gap-4 text-white bg-gray-900 p-4">
      {editingId === character.id ? (
        <div className="text-gray-500">
          <input
            className="border rounded px-2 py-1 mb-1 w-full"
            type="text"
            value={editChar.name}
            onChange={(e) => setEditChar({ ...editChar, name: e.target.value })}
          />
          <input
            className="border rounded px-2 py-1 mb-1 w-full"
            type="text"
            value={editChar.realName}
            onChange={(e) => setEditChar({ ...editChar, realName: e.target.value })}
          />
          <input
            className="border rounded px-2 py-1 mb-2 w-full"
            type="text"
            value={editChar.universe}
            onChange={(e) => setEditChar({ ...editChar, universe: e.target.value })}
          />
          <div className="flex justify-between">
            <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => onUpdate(character.id)}>Save</button>
            <button className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl text-red-500 font-semibold">{character.name}</h3>
          <p className="my-2"><b>Real Name:</b> {character.realName}</p>
          <p><b>Universe:</b> {character.universe}</p>
          <div className="mt-2 flex justify-between">
            <button className="text-blue-500 hover:underline" onClick={() => onEdit(character.id)}>Edit</button>
            <button className="text-red-500 hover:underline" onClick={() => onDelete(character.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
