import {useState} from 'react'

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible? '': 'none'}
    const hideWhenVisible = {display: visible? 'none': ''}

    const ToggleVisible = () => setVisible(!visible)
    
    return(
        <div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={ToggleVisible}>cancel</button>
            </div>
            <div style={hideWhenVisible}>
                <button onClick={ToggleVisible}>{props.showButtonText}</button>
            </div>
        </div>

    )
}

export default Toggable