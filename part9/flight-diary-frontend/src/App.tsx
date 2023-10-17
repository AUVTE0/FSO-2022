import { SyntheticEvent, useEffect, useState } from 'react'
import './App.css'
import { DiaryEntry, NewDiaryEntry } from './types'
import { getAll, create } from './services/entries'
import { Header } from './components/Header';
import { Content } from './components/Content';
import EntryForm from './components/EntryForm';
import { AxiosError } from 'axios';
import { Error } from './components/Error';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getAll().then((data: DiaryEntry[]) => {
      setEntries(data.reverse())
    })
  }, [])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      date: { value: string };
      visibility: { value: string };
      weather: { value: string };
      comment: { value: string };
    };

    const newEntry = {
      date: target.date.value,
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment: target.comment.value
    } as NewDiaryEntry;

    try{
      const result = await create(newEntry)
      setEntries([result as DiaryEntry, ...entries])
    }
    catch(e){
      if(e instanceof AxiosError){
        // console.log(e.response?.data)
        setError(e.response?.data)
      }
    }

  }

  return (
    <>
    {
      error && <Error text={error} />
    }
    <EntryForm handleEntryCreate={handleSubmit} />
    <Header text='Entries'/>
    <Content entries={entries}/>
    </>
  )
}

export default App
