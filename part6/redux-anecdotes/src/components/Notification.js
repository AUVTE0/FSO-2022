import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.message)
  const state = useSelector(state => state)
  console.log(state)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!notification)
    return null
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification