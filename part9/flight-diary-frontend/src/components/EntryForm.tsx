import { SyntheticEvent, useState } from 'react'
import { TextInput } from './TextInput'

const EntryForm = ({ handleEntryCreate }:{ handleEntryCreate: (e: SyntheticEvent) => void }) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')


  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit = {async e => {
        handleEntryCreate(e)
      }}>
        <TextInput name={'date'} value={date} onChange={setDate}/>
        <TextInput name={'visibility'} value={visibility} onChange={setVisibility}/>
        <TextInput name={'weather'} value={weather} onChange={setWeather}/>
        <TextInput name={'comment'} value={comment} onChange={setComment}/>
        <button id='create-button' type='submit'>create</button>
      </form>

    </div>
  )
}

export default EntryForm