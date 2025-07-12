import { createRoot } from 'react-dom/client'
import clarity from '@microsoft/clarity'
import App from './App.tsx'
import './index.css'
import { trackUserBehavior } from './utils/tracking'

// Initialize Microsoft Clarity
const projectId = "sch93q7qvt"
clarity.init(projectId);

// Track first access when the app initializes
trackUserBehavior("first_access");

createRoot(document.getElementById("root")!).render(<App />);
