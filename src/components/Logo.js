import React from 'react';
import logo from'../image/logo.jpg'
import './styles/Home.css';

const Home = () => {
    return (
        <div className={'container'}>
            <img src={logo}/>
            <h1>PCR COVID-19 test results</h1>
        </div>
    );
};

export default Home;