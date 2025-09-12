function CharacterForm({ character, setCharacter, onSubmit, submitText }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 flex flex-wrap gap-2">
      <input
        className="border rounded px-2 py-1"
        type="text"
        required
        placeholder="Name"
        value={character.name}
        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
      />
      <input
        className="border rounded px-2 py-1"
        type="text"
        required
        placeholder="Real Name"
        value={character.realName}
        onChange={(e) => setCharacter({ ...character, realName: e.target.value })}
      />
      <input
        className="border rounded px-2 py-1"
        type="text"
        required
        placeholder="Universe"
        value={character.universe}
        onChange={(e) => setCharacter({ ...character, universe: e.target.value })}
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        {submitText}
      </button>
    </form>
  );
}

export default CharacterForm;
