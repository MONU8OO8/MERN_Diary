import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  // const s1 = {
  //     "name": "monu",
  //     "class": "5b"
  // }
  // const [state, setState] = useState(s1);
  // const update = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name": "kumar",
  //             "class": "btech"
  //         })
  //     }, 1000);
  // }

  // const initialnotes = [
  //     {
  //       "_id": "63d2b687a1862d79e1504065d",
  //       "user": "63d14d9f5246003b71f00270",
  //       "title": "my title update1",
  //       "description": "this is updated1 add notes end point this destruction",
  //       "tag": "vscode",
  //       "date": "2023-01-26T17:21:11.457Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "63d54904f1dcb092f5f3b4afe",
  //       "user": "63d14d9f5246003b71f00270",
  //       "title": "my title",
  //       "description": "this is add notes end point this destruction",
  //       "tag": "personal",
  //       "date": "2023-01-28T16:10:44.809Z",
  //       "__v": 0
  //     }
  //   ]
  // const [notes, setNotes] = useState(initialnotes);


  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // // Add a Note
  // const addNote = (title, description, tag) => {
  //   // TODO: API Call
  //   console.log("Adding a new note")
  //   const note = {
  //     "_id": "63d54904f1dcb092f5f3b4afe",
  //     "user": "63d14d9f5246003b71f00270",
  //     "title": title,
  //     "description": description,
  //     "tag": tag,
  //     "date": "2023-01-28T16:10:44.809Z",
  //     "__v": 0
  //   };
  //   setNotes(notes.concat(note))
  //   // notes.concat will return a new array
  // }

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMTRkOWY1MjQ2MDAzYjcxZjAwMjcwIn0sImlhdCI6MTY3NDc1MDYxN30.tAamlU0RFlc01s0tbvb8g97x60FTFigAsOgvA0ZO9qM"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMTRkOWY1MjQ2MDAzYjcxZjAwMjcwIn0sImlhdCI6MTY3NDc1MDYxN30.tAamlU0RFlc01s0tbvb8g97x60FTFigAsOgvA0ZO9qM"
      },
      // data is string
      body: JSON.stringify({ title, description, tag })
    });
    // const json = await response.json();
    const note = await response.json();
    setNotes(notes.concat(note))
    // console.log(json);


    // console.log("Adding a new note")
    // const note = {
    //   "_id": "63d54904f1dcb092f5f3b4afe",
    //   "user": "63d14d9f5246003b71f00270",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-09-03T14:20:09.668Z",
    //   "__v": 0
    // };
    // setNotes(notes.concat(note))
  }

  // // Delete a Note
  // const deleteNote = (id) => {
  //   // TODO: API Call
  //   console.log("Deleting the note with id" + id);
  //   const newNotes = notes.filter((note) => { return note._id !== id })
  //   setNotes(newNotes)
  // }


  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMTRkOWY1MjQ2MDAzYjcxZjAwMjcwIn0sImlhdCI6MTY3NDc1MDYxN30.tAamlU0RFlc01s0tbvb8g97x60FTFigAsOgvA0ZO9qM"
      }
    });
    const json = response.json();
    console.log(json)


    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  // this is update note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMTRkOWY1MjQ2MDAzYjcxZjAwMjcwIn0sImlhdCI6MTY3NDc1MDYxN30.tAamlU0RFlc01s0tbvb8g97x60FTFigAsOgvA0ZO9qM"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);
    // here we make note string first then make that a object that give deep copy of notes
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    // <NoteContext.Provider value={{state: state, update:update}}>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;