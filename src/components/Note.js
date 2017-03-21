import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import moment from 'moment';

class Note extends Component {
    constructor(props) {
        super(props);

        // bind this
        this.edit = this.edit.bind(this);        
        this.save = this.save.bind(this);        
        this.goToFront = this.goToFront.bind(this);        
        this.goToBack = this.goToBack.bind(this); 
        this.autoSave = this.autoSave.bind(this);       

        // initialize the state from props
        this.state = {
            editing: false,
            id: this.props.id,
            text: this.props.initialText,
            time: this.props.time,
			x: this.props.x,
			y: this.props.y,
            zIndexClass: "zIndex1"
        }
    }

    edit() {
        this.setState({
            editing: true,
        });
        this.goToFront();
    }

    goToFront() {
        this.setState({
            zIndexClass: "zIndex99"
        });                 
    }

    goToBack() {
        this.setState({
            zIndexClass: "zIndex1"
        });                 
    }    

    save() {
        let newText = this.refs.newText.value;  // retrieve the value from textarea
        this.setState({text: newText});
        this.setState({editing: false});
    }

    // detect the enter key
    autoSave (event) {
        if (event.which == 13 || event.keyCode == 13) {
            this.save();
            return false;
        }
        return true;     
    }

    // focus and select the current text if the component is in editing mode
    componentDidUpdate() {
        if(this.state.editing) {
            this.refs.newText.focus()
        }
    }

    // display a form when editing: true
    renderForm() {
        return (
            <div onMouseOver={this.goToFront} 
                 onMouseOut={this.goToBack}
                 className={`${this.state.zIndexClass} note`}
				 style={{left: this.props.x,
						 top: this.props.y,
						 backgroundColor: this.props.backgroundColor}}>
                <textarea ref="newText" 
                          defaultValue={this.state.text}
                          onKeyPress={this.autoSave}></textarea>
            </div>
        )
    }

    // display a note when editing: false 
    renderNote() {
        return (
            <div 
                onMouseOver={this.goToFront} 
                onMouseOut={this.goToBack}
                onDoubleClick={this.edit}
                className={`${this.state.zIndexClass} note`}
                style={{left: this.props.x, 
						top: this.props.y,
						backgroundColor: this.props.backgroundColor}}>
                <p>{this.state.text}</p>
                <button className="topButton" 
                    	onClick={() => this.props.removeNote(this.props.id)}
                >X</button>
                <span className="time">{moment(this.props.time).format("DD/MMM hh:mm")}</span>
            </div>
        )
    }

    render() {
        return (
            <Draggable>{(this.state.editing) ? this.renderForm()
                                  			 : this.renderNote()}</Draggable>
        )
    }
}

export default Note;