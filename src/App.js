import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import Header from './component/Header';
import Home from './component/Home';
import CartDetails from "./component/CartDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom";
function App() {
  return (
    <div >
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<CartDetails/>} />
      </Routes>
      <Toaster />
   
    </div>
  );
}

export default App;
