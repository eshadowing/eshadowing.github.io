import { createRoot } from 'react-dom/client'
import clarity from '@microsoft/clarity'
import App from './App.tsx'
import './index.css'

// Initialize Microsoft Clarity
const projectId = "sch93q7qvt"
clarity.init(projectId);

createRoot(document.getElementById("root")!).render(<App />);
