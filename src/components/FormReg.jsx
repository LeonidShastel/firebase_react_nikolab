import React, {useEffect, useState} from 'react';
import Logo from "./Logo";
import './styles/FormReg.css'
import {Link, useHistory} from "react-router-dom";
import {firebase} from "../fire";

const db = firebase.database();


const FormReg = () => {
    const history = useHistory();

    const [patient, setPatient] = useState({
        PATIENT_NAME: '',
        DATE_BIRTH: '',
        SEX: 'Male',
        COLLECTION_TIME: '',
        RESULT_TIME: '',
        RESULT_TEST: '',
        PASSPORT_CODE: '',
        DOWNLOAD_COUNT: 0,
    })

    function sendBody(){

        function getId() {
            const counterRef = db.ref('counter');
            return counterRef.transaction(function(currentId) {
                return currentId + 1;
            });
        }

        getId().then(transactionResult=>{
            const id = transactionResult.snapshot.val();
            db.ref(`patients/${id}`).set(patient)
                .then(()=>confirmSave(id))
                .catch(error=>console.log(error));
        })
    }

    function confirmSave(order){
        const result = window.confirm("The result is saved. Click 'Ok' to save");
        if(result){
            history.push({
                pathname: `/${order}`
            })
        }
    }

    return (
        <div>
            <Logo/>
            <div className={'form'}>
                <form>
                    <label>Full Name: </label>
                    <input value={patient.PATIENT_NAME} onChange={e=>setPatient({...patient, PATIENT_NAME:e.target.value})}/>
                </form>
                <form>
                    <label>Date of birth: </label>
                    <input type={'date'} value={patient.DATE_BIRTH} onChange={e=>setPatient({...patient, DATE_BIRTH:e.target.value})}/>
                </form>
                <form>
                    <label>Passport code: </label>
                    <input value={patient.PASSPORT_CODE} onChange={e=>setPatient({...patient, PASSPORT_CODE:e.target.value})}/>
                </form>
                <form>
                    <label>Sex: </label>
                    <select defaultValue={patient.SEX} onChange={e=>{
                        console.log(e.target.value);
                        setPatient({...patient, SEX: e.target.value})
                        console.log(patient);
                    }}>
                        <option value={'Male'}>Male</option>
                        <option value={'Female'}>Female</option>
                    </select>
                </form>
                <form>
                    <label>Collection time: </label>
                    <input value={patient.COLLECTION_TIME} onChange={e=>setPatient({...patient, COLLECTION_TIME:e.target.value})}/>
                </form>
                <form>
                    <label>Result time: </label>
                    <input value={patient.RESULT_TIME} onChange={e=>setPatient({...patient, RESULT_TIME:e.target.value})}/>
                </form>
                <form>
                    <label>Result: </label>
                    <input value={patient.RESULT_TEST} onChange={e=>setPatient({...patient, RESULT_TEST:e.target.value})}/>
                </form>
            </div>
            <div className={'button_block'}>
                <Link to={'/'}>
                    <button>Return to home page</button>
                </Link>
                <button onClick={sendBody}>Save</button>
            </div>
        </div>
    );
};

export default FormReg;