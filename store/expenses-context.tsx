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
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
}

const DUMMY_EXPENSES: Expense[] = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-09-09'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'Another book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 18.99,
    date: new Date('2022-02-22'),
  },
];

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type ActionType =
  | {type: 'ADD'; payload: Expense}
  | {type: 'DELETE'; payload: string}
  | {type: 'UPDATE'; payload: {id: string; data: Partial<Expense>}};

function expensesReducer(state: Expense[], action: ActionType): Expense[] {
  switch (action.type) {
    case 'ADD':
      return [{...action.payload}, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: Expense) {
    dispatch({type: 'ADD', payload: expenseData});
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
        addExpense,
        deleteExpense,
        updateExpense,
      }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
