export const TextInput = ({ name, value, onChange }: { name: string, value: string, onChange: (value: string) => void }) => {
    return (
        <>
            <label htmlFor={name}>{name}: </label>
            <input
                id={name}
                type='text'
                name={name}
                value={value}
                onChange={({ target }) => onChange(target.value)}
            /><br/>
        </>
    )
}
