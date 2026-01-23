import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css';
import styles from './CSS Modules/Main.module.css'

createRoot(document.getElementById('root')).render(
  <div className = {styles.body}>
    <App />
  </div>
)  