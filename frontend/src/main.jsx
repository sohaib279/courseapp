
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_51QJE2ELtJ7HtT1oVM92OkKj5PdYEvRDA0OJ7lMtbBCj6Fbz1AEoRDCn3PrsfkmKXzKTQuOvKZThRhBCPimAit0aD00Z64IeuH8");

createRoot(document.getElementById('root')).render(
  
  <Elements  stripe={stripePromise}>
 <BrowserRouter>
  <App />
  </BrowserRouter>
</Elements>
  )