import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

    // display a form when editing: true
    renderForm() {
        return (
            <div className="note">
                <textarea ref="newText" autoFocus></textarea>
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
            <div className="note">
                <p>{this.state.text}</p>
                <span>
                    <button onClick={this.edit}>EDIT</button>
                    <button onClick={() => removeNote(id)}>X</button>
                </span>
            </div>
        );    
    }

    // componentDidMount() {
    //     this.refs.newText.focus();
    // }

    render() {
        return (this.state.editing) ? this.renderForm()
                                    : this.renderNote();
    }
}

export default Note;