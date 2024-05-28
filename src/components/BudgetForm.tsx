import { useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';


export default function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget(); // Custom hook

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }    

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}})
    } 
    

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-2xl font-bold text-center text-sky-600"> Ingresa tu presupuesto
            </label>
            <input 
                id="budgetID"
                type="number" 
                className="w-full bg-white border p-2"
                placeholder="Ingresa tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            />

        </div>

        <input 
            type="submit"
            value="Definir presupuesto"
            className="w-full bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-8 rounded disabled:bg-gray-400 disabled:cursor-not-pointer"
            disabled={isValid}

        />

    </form>
  )
}
