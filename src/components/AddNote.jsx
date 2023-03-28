import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/notecontext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e)=>{
        // preventDefault will stop pages reloading
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Notes has been added successfully", "success")
    }

    // {...note (...) this is spred operator}
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" minLength={5} required aria-describedby="emailHelp" onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" minLength={5} required className="form-control" value={note.description} id="description" name="description" onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input minLength={5} required type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                 
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote