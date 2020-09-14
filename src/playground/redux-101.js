import {createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET',
    count: 0
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const countReducer = (state = {count: 0}, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return { count: state.count + action.incrementBy };
        case 'DECREMENT':
            return { count: state.count - action.decrementBy };
        case 'RESET':
            return { count: action.count };
        case 'SET':
                return { count: action.count };
        default:
            return state;
    }
};

// the reference and not the function call
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCount());

store.dispatch(incrementCount({incrementBy: 10}));

// this will stop to render the subscribe method, so here it will just console one time the first INCREMENT ACTION
// unsubscribe();

store.dispatch(setCount({ count:30 }));

store.dispatch(incrementCount());
store.dispatch(decrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 5}));
store.dispatch(decrementCount());
