import React, { Component } from 'react';
import 'whatwg-fetch';

import Note from './note';

class Board extends Component {
    constructor(props) {
        super(props);

        this.removeNote = this.removeNote.bind(this);
        this.randomPosition = this.randomPosition.bind(this);
        this.randomColor = this.randomColor.bind(this);

        // initilize an empty notes array
        // each time a user clicks add button, a new note is added to the array
        this.state = {
            notes: []
        }
    }

    // generate a random position for a note
    randomPosition(x, y, unit) {
        return (x + Math.ceil(Math.random() * (y-x))) + unit;
    }

    // generate a color
    randomColor() {
        const colorLetters = ["B", "C", "D", "E", "F"];
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += colorLetters[Math.floor(Math.random() * colorLetters.length)];
        }
        return color;
    }

    // generate a unique id for each note
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId += 1;
    }

    // use spread operator to copy all existing note objects
    // then create a new note object and add it to the notes array
    addNewNote(initialText) {
        const newNotes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                text: initialText,
                time: new Date(),
                backgroundColor: this.randomColor(),
                x: this.randomPosition(0, window.innerWidth - 150, "px"),
                y: this.randomPosition(0, window.innerHeight - 150, "px")
            }
        ]
        this.setState({notes: newNotes});
    }

    // remove note by filtering the notes array
    removeNote(id) {
        const newNotes = this.state.notes.filter((note) => note.id !== id);
        this.setState({notes: newNotes});
    }

    // clear all the notes
    clearAllNotes() {
        this.uniqueId = 0;
        this.setState({notes: []});
    }

    // queue all the notes
    queueAllNotes() {    
        let colNums = Math.ceil(window.innerWidth / 250);
        let newNotes = this.state.notes.map((note, index) => {
            note.x = (index % colNums) * 210 + "px", 
            note.y = 200 * Math.floor(index / colNums) + "px";
            return note;
        })
        console.log(newNotes);
        
        this.setState({
            notes: newNotes
        })
    
    }

    componentWillMount() {
        if(this.props.count) {
            const url = `https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`;            
            
            // helper function to debug in fetch library
            const logHelper = (data) => {
                console.log(data);
                return data;
            }
            
            fetch(url)
                 .then(results => results.json())
                 .then(array => array[0])
                 .then(sentenceCollection => sentenceCollection.split('. '))
                 .then(sentenceArray => sentenceArray.forEach(
                     sentence => {							
						sentence = sentence.substr(0, 40);
                        this.addNewNote(sentence);
                     }))
                 .catch(function(err) {
                     console.log("Failed to connect to the API", err);
                 })
        }
    }

    // render all the notes using a map() function 
    // pass removeNote function to each Note component
    renderNote() {
        return (
            this.state.notes.map((note, index) => {
                return <Note key={note.id} 
                             id={note.id}
                             initialText={note.text}
                             x={note.x}
                             y={note.y}
                             backgroundColor={note.backgroundColor}
                             time={note.time}
                             removeNote={this.removeNote}></Note>
            })
        )
    }

    render() {
        return (
            <div className="board">
                {this.renderNote()}
                <button className="addButton" onClick={() => this.addNewNote("new note")}>+</button>
                <button className="clearButton" onClick={() => this.clearAllNotes()}>C</button>
                <button className="queueButton" onClick={() => this.queueAllNotes()}>Q</button>
            </div>
        )
    }
}

export default Board;