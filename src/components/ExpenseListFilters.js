import React from 'react';
import { connect } from 'react-redux'
import {setTextFilter, sortByDate, sortByAmount} from '../actions/filters';

/**
 * we put here the value of the text of the filters property because we want it updated by 
 * the value typed by the user in the field
 * And then because we connect our component to the store, the props has the property function dispatch
 * that we can use to set actions after some interactions (here onChange)
 * @param {*} props 
 */
const ExpenseListFilters = (props) => (
    <div>        
        <input type="text" value={props.filters.text} onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value))            
        }}/>
        <select value={props.filters.sortBy} onChange= {(e) => {
            const val = e.target.value;
            if(val === 'date') {
                props.dispatch(sortByDate());
            } else if(val === 'amount') {
                props.dispatch(sortByAmount());
            }
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

// the connect method here defines that the filters on the store now will be available in the ExpenseListFilters component
// by getting by props.filters

export default connect(mapStateToProps)(ExpenseListFilters);