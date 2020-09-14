const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // push will change the variable but concat will not
            // return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ];
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                return expense;
            });
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => action.id && id !== action.id);
        default:
            return state;
    }
};