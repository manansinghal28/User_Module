import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Edituser from './Users/Edituser';
import Viewuser from './Users/Viewuser';
import viewlogin from './pages/viewlogin';
import Dashboard from './Users/dashboard';
import ViewLogin from './pages/viewlogin';
import Editlogin from './pages/editlogin';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Router>
       <Navbar/>
      <Routes>
        <Route exact path="Dashboard" element={<Dashboard/>}/>
        <Route exact path="/" element={ <Home /> }/>
       <Route exact path="/editlogin/:id" element= {<Editlogin/>} />
       <Route exact path="/edituser/:id" element= {<Edituser/>} />
        <Route exact path="/viewlogin/:id" element={isLoggedIn === "true" ?<ViewLogin/>: <SignIn/>} />
        <Route exact path="/signin" element={<SignIn/>} />
        <Route exact path="/viewuser/:id" element={<Viewuser/>}/>        
      </Routes>
       </Router>
    </div>
  );
}
export default App;