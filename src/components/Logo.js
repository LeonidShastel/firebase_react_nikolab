import React from 'react';
import logo from'../image/logo.jpg'
import './styles/Home.css';

const Logo = () => {
    return (
        <div className={'container'} style={{textAlign:'center', width: '450px', padding: '10px 20px'}}>
            <img src={logo}/>
            <h1 style={{width: '350px'}}>PCR COVID-19 test results</h1>
        </div>
    );
};

export default Logo;