import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { produce } from "immer";

const CreateNote = ({ setNotes, setCreatingNote, nextId, setNextId }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleNewText = (e) => {
    setNewText(e.target.value);
  };

  const handleDontCreate = () => {
    setNewText("");
    setNewTitle("");
    setCreatingNote(false);
  };

  const handleCreate = () => {
    console.log(nextId);
    const newNote = {
      title: newTitle,
      text: newText,
      x: 0,
      y: 0,
      zIndex: nextId,
    };

    setNotes(
      produce((draft) => {
        draft[nextId] = newNote;
      }),
    );

    setNextId(nextId + 1);
    setNewText("");
    setNewTitle("");
    setCreatingNote(false);
  };

  return (
    <>
      <div className="note-creation">
        <div className="note-body">
          <div className="note-titlebar">
            <textarea
              type="text"
              placeholder="Title..."
              value={newTitle}
              onChange={handleNewTitle}
            />
            <div className="icons" />
          </div>
          <div className="note-textedit">
            <textarea
              type="text"
              placeholder="Text..."
              value={newText}
              onChange={handleNewText}
            />
          </div>
        </div>
        <div className="confirm-icons-box">
          <FontAwesomeIcon
            icon={faXmark}
            className="confirm-icon"
            onClick={handleDontCreate}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className="confirm-icon"
            onClick={handleCreate}
          />
        </div>
      </div>
      <div className="grey-bg" />
    </>
  );
};

export default CreateNote;
