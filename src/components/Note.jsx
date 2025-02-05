import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { produce } from "immer";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

const Note = ({ note, id, setNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const nodeRef = useRef(null); // from https://www.windmill.dev/blog/react-draggable-component

  const handleDrag = (e, data) => {
    setNotes(
      produce((draft) => {
        draft[id] = { ...draft[id], ...{ x: data.x, y: data.y } };
      }),
    );
  };

  const handleEditText = (e) => {
    setEditedText(e.target.value);
  };

  const saveEditedText = () => {
    setNotes(
      produce((draft) => {
        draft[id].text = editedText;
      }),
    );
    setIsEditing(false);
  };

  const handleDeleteNote = (e) => {
    // confirmation?
    setNotes(
      produce((draft) => {
        delete draft[id];
      }),
    );
  };

  const renderText = () => {
    if (isEditing) {
      return (
        <div className="note-textedit">
          <textarea type="text" value={editedText} onChange={handleEditText} />
        </div>
      );
    } else {
      return (
        <ReactMarkdown
          className="note-markdown"
          onClick={() => setIsEditing(true)}
        >
          {note.text}
        </ReactMarkdown>
      );
    }
  };

  return (
    <Draggable
      handle=".note-titlebar"
      // grid={[25, 25]}
      defaultPosition={{ x: 0, y: 0 }}
      position={{
        x: note.x,
        y: note.y,
      }}
      nodeRef={nodeRef}
      onDrag={handleDrag}
    >
      <div ref={nodeRef} className="note-body">
        <div className="note-titlebar">
          <div>{note.title}</div>
          <div className="icons">
            {isEditing ? (
              <FontAwesomeIcon icon={faCheck} onClick={saveEditedText} />
            ) : (
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => setIsEditing(true)}
              />
            )}

            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteNote} />
          </div>
        </div>
        {renderText()}
      </div>
    </Draggable>
  );
};

export default Note;
