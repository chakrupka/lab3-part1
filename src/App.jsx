import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";

const App = () => {
  const [notes, setNotes] = useState({});
  const [creatingNote, setCreatingNote] = useState(false);
  const [nextId, setNextId] = useState(0);

  const handleNewNote = () => {
    setCreatingNote(true);
  };

  return (
    <>
      {creatingNote && (
        <CreateNote
          setNotes={setNotes}
          setCreatingNote={setCreatingNote}
          nextId={nextId}
          setNextId={setNextId}
        />
      )}
      <div className="noteboard">
        <div
          className="create-note-button"
          role="button"
          tabIndex={0}
          onClick={handleNewNote}
        >
          <FontAwesomeIcon icon={faPlus} className="add-note" />
        </div>
        {Object.entries(notes).map(([id, noteData]) => (
          <Note note={noteData} id={id} setNotes={setNotes} key={id} />
        ))}
      </div>
    </>
  );
};

export default App;
