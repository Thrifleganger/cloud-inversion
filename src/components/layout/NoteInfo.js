import React from 'react';
import styles from "../../styles/layout/MainLayout.module.css";

const NoteInfo = () => {

  const notes = ["C", "C<sub>#</sub>", "D", "D<sub>#</sub>",
    "E", "F", "F<sub>#</sub>", "G", "G<sub>#</sub>", "A", "A<sub>#</sub>", "B"];
  const notesInfo = (
    <>
      {notes.map(note => <span dangerouslySetInnerHTML={{__html: note}} key={note}/>)}
    </>
  )

  return (
    <div className={styles.notesInfoSection}>
      {notesInfo}
    </div>
  );
}

export default React.memo(NoteInfo);