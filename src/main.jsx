import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
        <Router/>
)
