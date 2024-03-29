const Notification = ({ message }) => {
  console.log(message)
  if (!message){
    return null
  }
  return (
    <div className={message[1]?'error':'noti'}>{message[0]}</div>
  )
}

export default Notification