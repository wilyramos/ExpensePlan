import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch} = useBudget()
    const percentage = +(totalExpenses / state.budget * 100).toFixed(2)
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="flex justify-center ">
            <CircularProgressbar

                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' : `#3b82f6`,
                    trailColor: '#f5f5f5',
                    textColor: percentage === 100 ? '#DC2626' : `#3b82f6`,
                    textSize: 8
                })}
                text={`${percentage}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
            <button 
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg uppercase shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => dispatch({type: 'reset-app'})}
            >
            Reestablecer Gasto
            </button>

            <AmountDisplay
                label="Presupuesto"
                amount={state.budget}
            />

            <AmountDisplay
                label="Restante"
                amount={remainingBudget}
            />

            <AmountDisplay
                label="Gastos"
                amount={totalExpenses}
            />
        </div>
        
    </div>
  )
}
