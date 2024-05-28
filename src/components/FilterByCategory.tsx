import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import { ChangeEvent } from 'react'


export default function FilterByCategory() {

    const { dispatch } = useBudget()
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
    }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <form className="flex flex-col gap-2">
            <label htmlFor="category"></label>
            <h2 className="text-xl">Filtrar por categoria</h2>
            <select 
                id="category"
                className="p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
            >
                <option value="">All</option>
                {
                    categories.map((category) => (
                        <option 
                            key={category.id} 
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </form>
    </div>
  )
}
