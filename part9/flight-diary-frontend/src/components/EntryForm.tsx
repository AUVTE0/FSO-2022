import { SyntheticEvent, useState } from 'react'
import { TextInput } from './TextInput'
import { RadioInput } from './RadioInput'
import { DateInput } from './DateInput'
import { Weather, Visibility } from '../types'

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
        <DateInput name={'date'} value={date} onChange={setDate}/>
        <RadioInput name='visibility' options={Object.values(Visibility)} value={visibility} onChange={setVisibility}/>
        <RadioInput name='weather' options={Object.values(Weather)} value={weather} onChange={setWeather}/>
        <TextInput name={'comment'} value={comment} onChange={setComment}/>
        <button id='create-button' type='submit'>add</button>
      </form>

    </div>
  )
}

export default EntryForm