import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import Home from './pages/index'
import About from './pages/about';
import SignUp from './pages/signup';
import Header from "./components/header";
import Signin from "./pages/signin";
import BookingForm from "./components/booking";



const queryClient = new QueryClient();
function App() {
  return <>
     <QueryClientProvider client={queryClient}>
     <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/booking" element={<BookingForm />} />
        
      </Routes>
    </Router>
    </QueryClientProvider>
         </>;
}

export default App;
