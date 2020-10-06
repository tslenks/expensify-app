import React from 'react';
import { connect } from 'react-redux'
import {setTextFilter} from '../actions/filters';

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
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

// the connect here define that the filters on the store know will be available in the ExpenseListFilters component
// by getting by props.filters

export default connect(mapStateToProps)(ExpenseListFilters);