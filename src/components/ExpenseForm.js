import React from 'react';

export default class ExpenseForm extends React.Component {
    
    state = {
        description: ''
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(/^\d+(\.\d{0,2})?$/.match(amount)){
            this.setState(() => ({ amount }));
        }
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        // e.persist() we use this if we wanted add directly in the callback the e.target.value, otherwise we get an error
        this.setState(() => ({ note }));
    };

    render () {
        return (
            <div>
                <form>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        autoFocus
                        value = {this.state.description}
                        onChange = {this.onDescriptionChange}
                    /> <br/>
                    <input 
                        type="number"
                        placeholder="Amount"
                        value = {this.state.amount}
                        onChange = {this.onAmountChange} 
                    /> <br/>
                    <textarea 
                        placeholder="Add a note for your expense" 
                        value = {this.state.note}
                        onChange = {this.onNoteChange} 
                    /> <br/>
                    <button onSubmit=""> Add expense </button>
                </form>
            </div>            
        );
    }
}