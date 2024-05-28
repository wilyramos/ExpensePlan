import { useState , ChangeEvent, useEffect} from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {
  
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget} = useBudget()

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }

    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // validar
        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        } 

        // validar no pasar el presupuesto

        if((expense.amount - previousAmount) > remainingBudget) {
            setError('No puedes superar el presupuesto')
            return
        }

        //Actualizar el gasto

        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', payload: {expense}})
        }

        // Resetear formulario

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }


    return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="text-lg font-semibold text-center border-b-4"
        >{state.editingId ? 'EDIT EXPENSE' : 'NEW EXPENSE'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label
                htmlFor="expenseName"
                className="text-sm font-semibold"
            >Expense Name:</label>
            <input
                type="text"
                id="expenseName"
                placeholder="Enter expense name"
                className="p-2 border border-gray-300 rounded-md"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="expenseAmount"
                className="text-sm font-semibold"
            >Expense Amount:</label>
            <input
                type="number"
                id="amount"
                placeholder="Enter expense amount"
                className="p-2 border border-gray-300 rounded-md"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="expenseCategory"
                className="text-sm font-semibold"
            >Categoria:</label>

            <select
                id="category"
                className="p-2 border border-gray-300 rounded-md"
                name="category"
                value={expense.category}
                onChange={handleChange}

                
            >
                <option value="">--Seleccione--</option>
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="expenseDate"
                className="text-sm font-semibold"
            >Expense Date:</label>
            <DatePicker
                className="p-2 border border-gray-300 rounded-md"
                value={expense.date}
                onChange={handleChangeDate}
            />
                
        </div>

        <input
            type="submit"
            className="bg-blue-500 font-bold text-white p-2 rounded-md hover:bg-blue-600 w-full cursor-pointer"
            value={state.editingId ? 'Update Expense' : 'Add Expense'}
        >

        </input>


    </form>
  )
}
