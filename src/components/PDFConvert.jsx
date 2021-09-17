import React, {useState, useEffect, useRef} from 'react';
import styles from './styles/PDFConvert.module.css'
import {useHistory, useParams} from "react-router-dom";
import {firebase} from "../fire";
import {useReactToPrint} from "react-to-print";


const db = firebase.database();
const options = {
    orientation: 'portrait',
    unit: 'in',
    format: 'A4',
};

const PdfConvert = () => {
    const doc = useRef();
    const {order} = useParams();
    const [patient, setPatient] = useState();
    const [loading, setLoading] = useState();
    const history = useHistory();

    useEffect(() => {
        const ref = db.ref(`patients/${order}`)
        ref.on("value", snapshot => {
            if (snapshot.val() === null) {
                setLoading(false);
                history.push('/')
                return;
            }
            setPatient({
                PATIENT_NAME: snapshot.val().PATIENT_NAME,
                DATE_BIRTH: snapshot.val().DATE_BIRTH,
                SEX: snapshot.val().SEX,
                COLLECTION_TIME: snapshot.val().COLLECTION_TIME,
                RESULT_TIME: snapshot.val().RESULT_TIME,
                RESULT_TEST: snapshot.val().RESULT_TEST,
                PASSPORT_CODE: snapshot.val().PASSPORT_CODE,
            })
            setLoading(false);
        })

        return () => ref.off();
    }, [order]);

    const handlePrint = useReactToPrint({
        content: () => doc.current,
        onAfterPrint: ()=>history.push('/'),
    })


    return (
        !loading && patient ?
            <div className={styles.container} id={'pdf'} onLoad={handlePrint} ref={doc}>
                <header className={styles.header}>
                    <div className={styles.contacts}>
                        <div>
                            <span>02125 Kyiv, boul. Perova 24<br/>02125 Київ, бул. Перова 24</span>
                        </div>
                        <div>
                            <span>+380 44 338 06 03<br/>+380 73 400 01 18</span>
                        </div>
                        <div>
                            <span>www.nikolab.com.ua<br/>office.nikolab@gmail.com</span>
                        </div>
                    </div>
                    <div className={styles.title}>
                        <h1>EXAMINATION RESULTS<br/>In-vitro diagnostics for SARS-CoV-2</h1>
                        <h1>РЕЗУЛЬТAТИ ДОСЛІДЖЕННЯ<br/>In-vitro діагностика SARS-CoV-2</h1>
                    </div>
                    <div className={styles.licenced}>
                        <span>Licensed by MoH of Ukraine</span>
                        <span>Ліцензія МОЗ України</span>
                        <span>АЕ № 638133 since 05.02.2015</span>
                        <span>Certificate of complience</span>
                        <span>Свідоцтво про аттестацію</span>
                        <span>ПТ 372/20 від 25.09.2020</span>
                        <span>ПТ 372/20 since 25.09.2020</span>
                    </div>
                </header>
                <main className={styles.main}>
                    <section className={styles.info}>
                        <div className={styles.patient_info}>
                            <div className={styles.info_block}>
                                <span>Пацієнт: </span>
                                <span>Patient: {patient.PATIENT_NAME + ' ' + patient.DATE_BIRTH.split('-').reverse().join('.') + ' ' + patient.PASSPORT_CODE}</span>
                            </div>
                            <div className={styles.info_block}>
                                <span>Стать: {patient.SEX === 'Male' ? 'Чоловіча' : 'Жіночий'} /</span>
                                <span>Sex: {patient.SEX}</span>
                            </div>
                            <div className={styles.info_block_aver}>
                                <div className={styles.info_block}>
                                    <span>Замовлення:</span>
                                    <span>Order:</span>
                                </div>
                                <span>{order}</span>
                            </div>
                            <div className={styles.info_block_aver}>
                                <div className={styles.info_block}>
                                    <span>Дата реєстрації:</span>
                                    <span>Registration Date:</span>
                                </div>
                                <span>{patient.COLLECTION_TIME}</span>
                            </div>
                            <div className={styles.info_block}>
                                <span>Матеріал: Назо- та/або орофарингеальний мазок /</span>
                                <span>Material: Nasal and/or oropharyngeal swab</span>
                            </div>
                        </div>
                        <div >
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nikolabs.web.app/${order}`}
                                alt={'QR Code'}/>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <div className={styles.section_nav}>
                            <div>
                                <span>INDICATOR /<br/>ПОКАЗНИК</span>
                            </div>
                            <div>
                                <span>RESULT /<br/>РЕЗУЛЬТАТ</span>
                            </div>
                            <div>
                                <span>REFERENCE VALUES /<br/>РЕФЕРЕНТНІ ЗНАЧЕННЯ</span>
                            </div>
                        </div>
                        <div className={styles.section_result}>
                            <div>
                                ПЛР. Визначення РНК
                                Коронавірусу SARS-CoV-2 COVID19 методом зворотньої
                                транскрипції / Real-Time
                                Polymerase Chain Reaction (RTPCR) detecting RNA of the SARSCoV-2 virus
                                Real-Time Polymerase Chain
                                Reaction (RT-PCR) detecting RNA
                                of the SARS-CoV-2 virus
                            </div>
                            <div>
                                (-) негативний / (-) negative
                            </div>
                            <div>
                                Аналітична чутливість (LoD) ПЛР тест-системи
                                для визначення РНК Коронавірусу SARS-CoV2
                                COVID 19 методом зворотньої транскрипції
                                становить 7-10 копій РНК/реакцію / Limit of
                                detection (LoD, analytical sensitivity) of the PCR
                                test system for the determination of RNA
                                Coronavirus SARS-CoV2 COVID 19 with reverse
                                transcription is 7-10 copies of RNA / reaction
                                Device manufacturer company: Bio-Rad
                                Laboratories, Inc., 5731 W. Las Positas Blvd.,
                                Pleasanton, CA 94588 USA CFX96TM
                            </div>
                        </div>
                    </section>

                </main>
                <footer className={styles.footer}>
                    <section className={styles.footer_section}>
                        <div>
                            <h3>NOTES:</h3>
                            <h4>ПРИМІТКИ:</h4>
                        </div>
                        <div>
                            <div className={styles.info_block}>
                                <span>Validator: M. Purska</span>
                                <span>Валідатор: М. Пурська</span>
                            </div>
                            <span>{patient.RESULT_TIME}</span>
                        </div>
                    </section>
                    <div style={{textAlign: "center"}}>
                        The test results are not a clinical diagnosis and require medical advice.<br/>
                        Результати досліджень не є клінічним діагнозом і потребують консультації Лікаря
                    </div>
                </footer>
            </div>
            : null
    );
};

export default PdfConvert;