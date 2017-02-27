import React, { Component } from 'react';

import Note from './note';

class Board extends Component {
    constructor(props) {
        super(props);

        this.removeNote = this.removeNote.bind(this);

        this.state = {
            notes: [
            ]
        }
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId += 1;
    }

    addNewNote(text) {
        let notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text
            }
        ]
        this.setState({notes});
    }

    removeNote(id) {
        const newNotes = this.state.notes.filter((note) => note.id !== id);

        this.setState({
            notes: newNotes
        });
    }

    render() {
        return (
            <div className="board">
                {this.state.notes.map((note) => {
                    return <Note key={note.id} 
                                 id={note.id}
                                 initialText={note.text}
                                 removeNote={this.removeNote}></Note>
                })}
                <button onClick={() => this.addNewNote()}>+</button>
            </div>
        )
    }
}

// check if the props.count is a type of number and if it's bigger than 100
// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Board.propTypes = {
    count: React.PropTypes.number,
    count: function(props, propName){
        if(props[propName] > 100) {
            return new Error("Too many notes will slow your computer!");
        }
    }
}

export default Board;