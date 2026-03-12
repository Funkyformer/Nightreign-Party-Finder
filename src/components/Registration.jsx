import { useState } from "react";
import { createPortal } from "react-dom";
import styles from './CSS Modules/Registration.module.css'

function Registration({isOpen, onClose}) {
    const [info, setInfo] = useState({
        username:'',
        password:'',
        email:''});
    const [login, setLogin] = useState(true);
    
    const handleForm = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setInfo({...info, [name]: val})
    }
    const toggleLogin = () => setLogin(!login);
    
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e);
    }

    return createPortal(
        <div className={styles.background}>
            { login ?
                <form className={styles.form} onSubmit={handleLogin}>
                    <input type='text' name='username' placeholder='Username' value={info.username} onChange = {handleForm} />
                    <input type='password' name='password' placeholder='Password' value={info.password} onChange = {handleForm} />
                    <input type='button' value='close modal' onClick={onClose} />
                    <input type='submit' value='Submit'/>
                    <input type='button' value='Switch to Register' onClick={toggleLogin} />
                </form> :
                <form className={styles.form} onSubmit={handleRegister}>
                    <input type='email' name='email' placeholder='Email' value={info.email} onChange = {handleForm} required/>
                    <input type='text' name='username' placeholder='Username' value={info.username} onChange = {handleForm} required/>
                    <input type='password' name='password' placeholder='Password' value={info.password} onChange = {handleForm} required/>
                    <input type='button' value='close modal' onClick={onClose} />
                    <input type='submit' value='Submit'/>
                    <input type='button' value='Switch to Login' onClick={toggleLogin} />
                </form>}
        </div>,
        document.body
    )
}
export default Registration;