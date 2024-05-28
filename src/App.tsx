import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseList from "./components/ExpenseList"
import ExpenseModal from "./components/ExpenseModal"
import FilterByCategory from "./components/FilterByCategory"
import { useBudget } from "./hooks/useBudget"
import { useEffect, useMemo } from "react"

function App() {

  // Custom hook
  const { state } = useBudget()
  const isValidaBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
    
  }, [state])


  return (
    <>
      <header className="py-6 ">
        <h1 className="uppercase text-center font-black text-4xl text-blue-800 border-x-8 border-indigo-500">
          Financial planner
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-10 p-6 sm:p-8 md:p-10 lg:p-12">
            {isValidaBudget ? <BudgetTracker/>: <BudgetForm/>}
          </div> 

          {isValidaBudget && (
            <main className="w-full gap-4 mx-auto px-4">
              <div>
                <FilterByCategory />
                <ExpenseList />
                <ExpenseModal />
              </div>          
            </main>       
          )}  
        
      </div>
 
    </>
  )
}

export default App
