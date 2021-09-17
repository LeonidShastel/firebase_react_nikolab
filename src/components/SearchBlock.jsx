import React, {useEffect, useState} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import './styles/SearchBlock.css';
import Logo from './Logo';
import {firebase} from '../fire';

const ref = React.createRef();
const db = firebase.database();

const SearchBlock = () => {
    const history = useHistory();
    const {resultId} = useParams();
    const [loading, setLoading] = useState(true);
    const [validId, setValidId] = useState(false);
    const [patient, setPatient] = useState({});


    useEffect(()=>{
        const ref = db.ref(`patients/${resultId}`)
        ref.on("value", snapshot=>{
            if (snapshot.val()===null){
                setLoading(false);
                return;
            }
            setPatient({
                PATIENT_NAME: snapshot.val().PATIENT_NAME,
                DATE_BIRTH: snapshot.val().DATE_BIRTH,
                SEX: snapshot.val().SEX,
                COLLECTION_TIME: snapshot.val().COLLECTION_TIME,
                RESULT_TIME: snapshot.val().RESULT_TIME,
                RESULT_TEST: snapshot.val().RESULT_TEST,
                DOWNLOAD_COUNT: +snapshot.val().DOWNLOAD_COUNT,
            })
            setValidId(true);
            setLoading(false);
        })

        return ()=>ref.off();
    },[resultId]);

    const result = (result) => {
        return (
            <div style={{display: "flex", justifyContent: 'center', width: '650px'}}>
                <div className={'request'}>
                    <h3>Full Name: <span>{result.PATIENT_NAME}</span></h3>
                    <h3>Sex: <span>{result.SEX}</span></h3>
                    <h3>Date of birth: <span>{result.DATE_BIRTH.split('-').reverse().join('.')}</span></h3>
                    <h3>Collection time: <span>{result.COLLECTION_TIME}</span></h3>
                    <h3>Test: <span>SARS CoV 2 coronovirus (COVID-19) (PCR-Real-Time)</span></h3>
                    <h3>Result time: <span>{result.RESULT_TIME}</span></h3>
                    <h3>Result: <span>{result.RESULT_TEST}</span></h3>
                    <h3>Medical Labotarory NIKOLAB</h3>
                </div>
            </div>
        )
    }

    const goToPDF=()=>{
        const updates = {};
        updates[`patients/${resultId}/DOWNLOAD_COUNT`] = patient.DOWNLOAD_COUNT+=1;
        db.ref().update(updates)
            .then(()=>history.push(`/pdf/${resultId}`))
            .catch(error=>console.log(error));
    }

    return (
        <div className={'container'}>
            <div ref={ref} className={'container'}>
                <Logo/>
                {   loading ?
                    <h1>Search your result</h1> :
                    <h1 style={{color: (validId ? 'limegreen' : "red")}}>Order ID {validId ? resultId : 'is Not Found'}</h1>
                }
                {validId && !loading ? result(patient) : null}
            </div>
            <div>
                <Link to={'/'}>
                    <button>Return to home page</button>
                </Link>
                {
                    patient.DOWNLOAD_COUNT<2 ? <button onClick={goToPDF}>Generate PDF</button> : null
                }
            </div>
        </div>
    );
}
;

export default SearchBlock;