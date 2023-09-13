import React, {createContext, useReducer, ReactNode} from 'react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type ActionType =
  | {type: 'ADD'; payload: Expense}
  | {type: 'SET'; payload: Expense[]}
  | {type: 'DELETE'; payload: string}
  | {type: 'UPDATE'; payload: {id: string; data: Partial<Expense>}};

function expensesReducer(state: Expense[], action: ActionType): Expense[] {
  switch (action.type) {
    case 'ADD':
      return [{...action.payload}, ...state];
    case 'SET':
      return action.payload.slice().reverse(); // Reverse a copy of the array
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      if (updatableExpenseIndex === -1) return state;
      const updatedItem = {...state[updatableExpenseIndex], ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

interface ExpensesContextProviderProps {
  children: ReactNode;
}

function ExpensesContextProvider({children}: ExpensesContextProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: Expense) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpenses(expenses: Expense[]) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id: string) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id: string, expenseData: Partial<Expense>) {
    dispatch({type: 'UPDATE', payload: {id, data: expenseData}});
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
