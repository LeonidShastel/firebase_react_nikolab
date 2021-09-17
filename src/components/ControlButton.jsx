import React, {useState} from 'react';
import './styles/ControlButton.css';
import {Link} from 'react-router-dom';
import Logo from './Logo'

const ControlButton = () => {
    const [valueInput, setValueInput] = useState('');

    function validate(e) {
        const finalInput = e.target.value === '' ? e.target.value : e.target.validity.valid ? e.target.value : valueInput;

        setValueInput(finalInput)
    }


    return (
        <div className={'container'}>
            <Logo/>
            <div>
                <input type={'text'} placeholder={'Enter the result number'} value={valueInput}
                       onInput={e => validate(e)} required={true} pattern={'^[0-9]*$'}/>
                <Link to={`/${valueInput}`}><button disabled={valueInput === ''}>Search</button></Link>
            </div>
        </div>
    );
};

export default ControlButton;