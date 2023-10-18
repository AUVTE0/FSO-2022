export const DateInput = ({ name, value, onChange }: { name: string, value: string, onChange: (value: string) => void }) => {
    return (
        <>
            <label htmlFor={name}>{name}: </label>
            <input 
                type="date" 
                id={name} 
                name={name} 
                value={value} 
                onChange={e => onChange(e.target.value)} 
            />

        </>
    )
}
