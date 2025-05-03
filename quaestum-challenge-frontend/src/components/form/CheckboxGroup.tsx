import { UseFormRegister } from 'react-hook-form'

interface CheckboxGroupProps {
  label: string
  name: string
  options: string[]
  register: UseFormRegister<any>
  error?: any
}

export function CheckboxGroup({ label, name, options, register, error }: CheckboxGroupProps) {
  return (
    <fieldset className="mb-4">
      <legend className="text-sm font-medium text-gray-700 mb-2">{label}</legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              value={opt}
              {...register(name)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {opt}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </fieldset>
  )
}
