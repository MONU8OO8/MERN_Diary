const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router();

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
     try {
          const notes = await Notes.find({ user: req.user.id });
          res.json(notes);
     } catch (error) {
          console.error(error.message);
          res.status(400).send("server error");
     }


})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
     body('title', 'Enter a valid title').isLength({ min: 3 }),
     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),]
     , async (req, res) => {

          try {
               //Destructure
               const { title, description, tag } = req.body;
               // Finds the validation errors in this request and wraps them in an object with handy functions
               // If there are errors, return Bad request and the errors
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
               }

               const note = new Notes({
                    title, description, tag, user: req.user.id
               })
               const savenote = await note.save();
               res.json(savenote);

          } catch (error) {
               console.error(error.message);
               res.status(400).send("server error");
          }


     })

// ROUTE 3: Update an existing Note using: Put "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
     const { title, description, tag } = req.body;
     try {
          // Create a newNote object
          const newNote = {};
          if (title) { newNote.title = title };
          if (description) { newNote.description = description };
          if (tag) { newNote.tag = tag };

          // Find the note to be updated and update it
          //req.params.id will give notes id
          let note = await Notes.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found") }

          //note.user.toString() will give user id
          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not Allowed");
          }

          //{$set: newNote} will add new note, {new: true} for permission to update notes
          note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
          res.json({ note });
     } catch (error) {
          console.error(error.message);
          res.status(400).send("server error");
     }


})

// ROUTE 4: Delete an existing Note using: Delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     // const { title, description, tag } = req.body;
     try {
          // Find the note to be deleted and delete it
          //req.params.id will give notes id
          let note = await Notes.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found") }

          //note.user.toString() will give user id
          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not Allowed");
          }

          //{$set: newNote} will add new note, {new: true} for permission to update notes
          note = await Notes.findByIdAndDelete(req.params.id)
          res.json({ "success": "Note has been deleted", note: note });
     } catch (error) {
          console.error(error.message);
          res.status(400).send("server error");
     }


})


module.exports = router