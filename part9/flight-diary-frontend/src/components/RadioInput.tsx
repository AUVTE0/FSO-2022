export const RadioInput = ({name, options, value, onChange}: {name: string, options:string[], value: string, onChange: (value: string) => void}) => (
    <div>
        <label htmlFor={name}>{name}: </label> 
        {
            options.map((opt: string) => (
                <>
                    <input 
                        type="radio" 
                        id ={opt} 
                        name={name} 
                        value={opt} 
                        checked={value === opt} 
                        onChange={({ target }) => {console.log(target.value)
                            onChange(target.value)}}
                        />
                    <label htmlFor={opt}>{opt}</label>
                </>
            ))
        }
    </div>
)