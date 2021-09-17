import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Logo from "./components/Logo";
import ControlButton from "./components/ControlButton";
import SearchBlock from "./components/SearchBlock";
import FormReg from "./components/FormReg";
import PdfConvert from "./components/PDFConvert";

function App() {

    return (
        <Router>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Switch>
                    <Route path={`/register`}><FormReg/></Route>
                    <Route path={`/pdf/:order`}><PdfConvert/></Route>
                    <Route path={`/:resultId`}><SearchBlock/></Route>
                    <Route path={'/'}><ControlButton/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
