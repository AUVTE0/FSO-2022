import { useEffect, useState } from 'react'
import './App.css'
import { DiaryEntry } from './types'
import { getAll } from './services/entries'
import { Header } from './components/Header';
import { Content } from './components/Content';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAll().then((data: DiaryEntry[]) => {
      setEntries(data)
    })
  }, [])

  return (
    <>
    <Header text='Entries'/>
    <Content entries={entries}/>
    </>
  )
}

export default App
