import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class Note extends Component {
    constructor(props) {
        super(props);

        // bind this
        this.edit = this.edit.bind(this);        
        this.save = this.save.bind(this);        

        // initialize the state from props
        this.state = {
            editing: false,
            id: this.props.id,
            text: this.props.initialText
        }
    }

    edit() {
        this.setState({editing: true});     
    }

    save() {
        let newText = this.refs.newText.value;  // retrieve the value from textarea
        this.setState({text: newText})
        this.setState({editing: false});
    }

    // generate a random color
    randomColor() {
        const colorLetters = ["B", "C", "D", "E", "F"];
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += colorLetters[Math.floor(Math.random() * colorLetters.length)];
        }
        return color;
    }    

    // generate a random position for a note
    randomPosition(x, y, unit) {
        return (x + Math.ceil(Math.random() * (y-x))) + unit;
    }

    // set the style before the component is being rendered
    componentWillMount() {        
        this.style = {
            right: this.randomPosition(0, window.innerWidth - 150, "px"),
            top: this.randomPosition(0, window.innerHeight - 150, "px"),
            backgroundColor: this.randomColor()
        }
    }

    // focus and select the current text if the component is in editing mode
    componentDidUpdate() {
        if(this.state.editing) {
            this.refs.newText.focus()
            this.refs.newText.select()
        }
    }

    // display a form when editing: true
    renderForm() {
        return (
            <div className="note"
                 style={this.style}>
                <textarea ref="newText" 
                          defaultValue={this.state.text}></textarea>
                <span>
                    <button onClick={this.save}>SAVE</button>
                </span>    
            </div>
        )
    }

    // display a note when editing: false
    renderNote() {
        // deconstructing assignment
        const { id, removeNote } = this.props;
        return (
            <div className="note"
                 style={this.style}>
                <p>{this.state.text}</p>
                <span>
                    <button onClick={this.edit}>EDIT</button>
                    <button onClick={() => removeNote(id)}>X</button>
                </span>
            </div>
        );    
    }

    render() {
        return (
            <Draggable>
            {(this.state.editing) ? this.renderForm()
                                    : this.renderNote()}
            </Draggable>                          
        )
    }
}

export default Note;