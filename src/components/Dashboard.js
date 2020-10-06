import React from 'react';
import ExpenseList from './ExpensesList';
import ExpenseListFilters from './ExpenseListFilters';

const Dashboard = () => (
    <div>       
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default Dashboard;