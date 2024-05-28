import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"
import { useMemo } from "react"


export default function ExpenseList() {

    const { state } = useBudget()
    const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="mt-4">

            {isEmpty ? <p className='text-center text-2xl font-bold text-gray-600 '>No hay gastos</p> : (
                <>
                    <p className='text-center text-2xl font-bold text-gray-600'>Gastos</p>
                    {filteredExpenses.map( expense => (
                        <ExpenseDetail 
                            key={expense.id} 
                            expense={expense}
                        />
                        
                    ))}

                </>
            )}

        </div>
    )
}
