import './App.css';
import { Predict } from "./components/Predict";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Page } from "./components/Page";
import { About } from './components/About';
import { Test } from './components/Test';
import { PredictionTable } from './components/PredictionTable';
// import {Test} from "./components/Test"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page/>}>
          <Route path="/" element={<Predict/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="predictions" element={<PredictionTable/>}/>
        </Route>
        <Route path="test" element={<Test><div>Hello</div><div>World</div></Test>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
