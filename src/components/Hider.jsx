import { useState } from 'react';
import styles from './CSS Modules/Hider.module.css';


function Hider(props) {
    const [hidden, setHidden] = useState(false);

    return (
        <div className = {styles.hider}>
            <div hidden = {hidden}>
                {props.children}
            </div>
            <button type = 'button' onClick = {() => setHidden(!hidden)}>Click me to toggle</button>
        </div>
    )
}
export default Hider;