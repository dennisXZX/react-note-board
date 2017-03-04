import React, { Component } from 'react';
import 'whatwg-fetch';

import Note from './note';

class Board extends Component {
    constructor(props) {
        super(props);

        this.removeNote = this.removeNote.bind(this);

        // initilize an empty notes array
        // each time a user clicks add button, a new note is added to the array
        this.state = {
            notes: []
        }
    }

    // generate a unique id for each note
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId += 1;
    }

    // use spread operator to copy all existing note objects
    // then create a new note object and add it to the notes array
    addNewNote(text) {
        const notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                text: text,
                time: new Date()
            }
        ]
        this.setState({notes});
    }

    // remove note by filtering the notes array
    removeNote(id) {
        const newNotes = this.state.notes.filter((note) => note.id !== id);
        this.setState({notes: newNotes});
    }

    // clear all the notes
    clearAllNotes() {
        this.uniqueId = 0;
        this.setState({notes: []});
    }

    componentWillMount() {
        if(this.props.count) {
            const url = `https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`;            
            fetch(url)
                 .then(results => results.json())
                 .then(array => array[0])
                 .then(sentenceCollection => sentenceCollection.split('. '))
                 .then(sentenceArray => sentenceArray.forEach(
                     sentence => {
                         sentence = sentence.substr(0, 40);
                         this.addNewNote(sentence)
                        }))
                 .catch(function(err) {
                     console.log("Failed to connect to the API", err);
                 })
        }
    }

    // render all the notes using a map() function 
    // pass removeNote function to each Note component
    renderNote() {
        return (
            this.state.notes.map((note) => {
                return <Note key={note.id} 
                             id={note.id}
                             initialText={note.text}
                             time={note.time}
                             removeNote={this.removeNote}></Note>
            })
        )
    }

    render() {
        return (
            <div className="board">
                {this.renderNote()}
                <button className="addButton" onClick={() => this.addNewNote("new note")}>+</button>
                <button className="clearButton" onClick={() => this.clearAllNotes()}>C</button>
            </div>
        )
    }
}

export default Board;