// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
    //For add user: for user privacy only login user can see their content only
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);