import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './App/Home'
import Edit from './App/Edit';
import AddNew from "./App/AddNew";
function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={ <Home /> }></Route>
                    <Route exact path={"/addNew"} element={ <AddNew /> }></Route>
                    <Route exact path="/edit/:id" element={ <Edit /> }></Route>
                </Routes>
            </Router>
        </div>
    )
}
export default App
