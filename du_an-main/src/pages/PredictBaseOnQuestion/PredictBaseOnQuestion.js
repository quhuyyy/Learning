import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useMemo, useRef, useState } from "react"

import { actions, useStore } from "../../store"
import style from './PredictBaseOnQuestion.module.css'
import PredictTextBaseOnQuestion from "./PredictTextBaseOnQuestion/PredictTextBaseOnQuestion"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { toast } from "react-toastify"
import { AnimatePresence, motion } from "framer-motion"


function PredictBaseOnQuestion() {

    const studentIDRef = useRef()
    const questionRef = useRef()
    const attemptsRef = useRef()


    const [state, dispatch] = useStore()
    const initData = useMemo(() => ({
        Question: '',
        StudentID: '',
        Attemps: '',
    }), [])

    const [inputData, setInputData] = useState(initData)

    const handleChange = (field) => (e) => {
        var value
        if (field !== 'Question') {
            value = parseFloat(e.target.value)

        }
        else {
            value = e.target.value
        }
        const newData = {
            ...inputData,
            [field]: value
        }
        setInputData(newData)
        dispatch(actions.setDataPredictQuestion({
            ...state.dataPredictQuestion,
            data: newData
        }));
    };

    const handlePredict = () => {

        var value2 = questionRef.current.value.trim()
        if (!value2 || "") {
            questionRef.current.focus()
            questionRef.current.select()
            toast.error("Bạn phải nhập đầy đủ thông tin")
            return;
        }

        var value1 = studentIDRef.current.value.trim();
        if (!value1 || isNaN(parseInt(value1))) {
            studentIDRef.current.focus();
            studentIDRef.current.select();
            toast.error("Bạn phải nhập đầy đủ thông tin");
            return;
        }
        else {
            if (value1.length > 8 || value1.length < 7) {
                studentIDRef.current.focus();
                studentIDRef.current.select();
                toast.error("Mã số sinh viên phải chứa từ 7 đến 8 kí tự");
                return;
            }
        }


        var value3 = attemptsRef.current.value.trim()
        if (!value3 || isNaN(parseInt(value3))) {
            attemptsRef.current.focus()
            attemptsRef.current.select()
            toast.error("Bạn phải nhập đầy đủ thông tin")
            return;
        }
        else {
            if (parseInt(value3) <= 0) {
                attemptsRef.current.focus()
                attemptsRef.current.select()
                toast.error("Số lần làm không được bé hơn 1")
                return;
            }
        }


        if (state.dataPredictQuestion && state.dataPredictQuestion.data) {
            let dataSend = {
                task_type: "predictQuestionScore",
                data: [
                    state.dataPredictQuestion.data.StudentID,
                    state.dataPredictQuestion.data.Question,
                    state.dataPredictQuestion.data.Attemps,
                ]
            };
            // console.log(state.dataPredictQuestion);

            // console.log(dataSend);
            fetch('http://165.22.244.31:8000/api/inlab/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data === -2)
                        dispatch(actions.setPredictedValueQuestion(parseInt(data)))
                    else {
                        dispatch(actions.setPredictedValueQuestion(parseInt(data.diemPredict)))
                        dispatch(actions.setTopic(data.topic))
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            toast.error("Bạn phải nhập đầy đủ thông tin!")
        }
    }

    const handleReset = () => {
        dispatch(actions.setResetQuestion(true));
        dispatch(actions.setDataPredictQuestion('clear'));
        dispatch(actions.setPredictedValueQuestion(''));
    };

    useEffect(() => {
        if (state.resetQuestion) {
            setInputData(initData)
            dispatch(actions.setResetQuestion(false))
        }
    }, [state.resetQuestion, initData, dispatch])


    return (
        <div className={clsx('container-fluid', style.root)}>
            <Header />
            <AnimatePresence mode="wait">
                <motion.div
                    key="predict-final"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className={style.body}>
                        <h1 className={clsx(
                            style.title,
                            'text-center',
                            'align-content-center')}
                        >
                            Dự đoán điểm đựa trên ngữ cảnh
                        </h1>
                        <div className="row mt-4 gx-5">

                            <div className="col-lg-6">
                                <div className={clsx('row', style.inputGroup2)}>
                                    <div className="col-lg-12 fw-bolder ">
                                        <label htmlFor="inputQuestion" className="mb-2">
                                            Câu hỏi
                                        </label>
                                    </div>
                                    <div className="col-lg-12">
                                        <textarea
                                            id="inputQuestion"
                                            className={clsx('form-control')}
                                            value={inputData.Question}
                                            rows={3}
                                            cols={50}
                                            onChange={handleChange('Question')}
                                            placeholder='Nhập câu hỏi mà bạn muốn biết điểm của sinh viên khi kiểm tra câu hỏi đó'
                                            required
                                            ref={questionRef}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className={clsx('row', style.inputGroup)}>
                                    <label className="mb-2 fw-bolder">
                                        Thông tin sinh viên
                                    </label>
                                    <div className={clsx("col-lg-4 text-end mt-lg-2 mb-lg-2", style.label)} >
                                        <label htmlFor="inputStudentID" className="mb-2">
                                            Mã số sinh viên
                                        </label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input
                                            id='inputStudentID'
                                            type="number"
                                            className={clsx('form-control')}
                                            placeholder='Nhập mã số sinh viên'
                                            value={inputData.StudentID}
                                            // name={name}
                                            onChange={handleChange('StudentID')}
                                            required
                                            ref={studentIDRef}
                                        />
                                    </div>
                                    <div className={clsx(style.label, "col-lg-4 text-end mt-lg-2 mt-md-2")}>
                                        <label htmlFor="inputAttemps" className="mb-2">
                                            Số lần làm
                                        </label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input
                                            id='inputAttemps'
                                            type="number"
                                            className={clsx('form-control')}
                                            placeholder='Nhập số lần làm bài'
                                            value={inputData.Attemps}
                                            // name={name}
                                            min={1}
                                            onChange={handleChange('Attemps')}
                                            required
                                            ref={attemptsRef}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <PredictTextBaseOnQuestion />
                            </div>
                        </div>
                        <div className="row mb-4 mt-4">
                            <div className="col-6 mt-2  text-center">
                                <button
                                    className={clsx(
                                        style.btnPredict,
                                        "btn btn-primary ml-lg-8"
                                    )}
                                    onClick={handlePredict}
                                >
                                    <FontAwesomeIcon icon={faCircleQuestion} />&nbsp;Dự đoán
                                </button>
                            </div>
                            <div className="col-6 mt-2 text-center">
                                <button
                                    className={clsx(style.btnReset, 'btn btn-danger')}
                                    onClick={handleReset}
                                >
                                    <FontAwesomeIcon icon={faRotateLeft} />&nbsp;Xóa trắng
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <Footer />
        </div>
    )
}

export default PredictBaseOnQuestion