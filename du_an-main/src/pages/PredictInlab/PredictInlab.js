import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import style from './PredictInlab.module.css';
import Lab from './LabItems/Lab';
import PredictionText from './PredictionText/PredictionText';
import { useStore, actions } from '../../store';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import BarInlab from './BarInlab/BarInlab';
// import Loading from '../../components/Loading/Loading'


//nếu bấm 2 lần nút predict với cùng giá trị thì nó ra số điểm khác nhau
function PredictInlab() {
    const [state, dispatch] = useStore();
    const [activeTab, setActiveTab] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [isChart, setIsChart] = useState(false)
    // const [loading, setLoading] = useState(false)

    const handlePredict = () => {
        const inputs = document.querySelectorAll('input[name="predictInlab"]');

        for (let i = 0; i < inputs.length; i++) {
            var value = parseInt(inputs[i].value.trim())
            var field = inputs[i].id.split("-").slice(1)
            if (isNaN(value)) {
                inputs[i].focus()
                inputs[i].select()
                toast.error("Bạn phải nhập đầy đủ thông tin")
                return;
            }
            switch (field[0]) {
                case 'maxScore':
                    var maxScoreTmp = inputs[i].value
                    if (value < 0 || value > 10) {
                        inputs[i].focus()
                        inputs[i].select()
                        toast.error("Điểm cao nhất chỉ nhận giá trị từ 0 đến 10")
                        return;
                    }
                    break;

                case 'minScore':
                    // console.log(maxScoreTmp);

                    if (value < 0 || value > 10) {
                        inputs[i].focus()
                        inputs[i].select()
                        toast.error("Điểm thấp nhất chỉ nhận giá trị từ 0 đến 10")
                        return;
                    }

                    if (value > maxScoreTmp) {
                        inputs[i].focus()
                        inputs[i].select()
                        toast.error("Điểm thấp nhất phải bé hơn hoặc bằng điểm cao nhất")
                        return;
                    }
                    break;

                case 'attempts':
                    if (value <= 0) {
                        inputs[i].focus()
                        inputs[i].select()
                        toast.error("Số lần làm bài phải lớn hơn 0")
                        return;
                    }
                    break;

                case 'numberOfQuestion':
                    if (value <= 0) {
                        inputs[i].focus()
                        inputs[i].select()
                        toast.error("Số câu hỏi phải lớn hơn 0")
                        return;
                    }
                    break;

                default:
                    throw new Error("Không tồn tại input này");
            }
        }
        const dataSend = {
            task_type: 'predictInlab',
            data: state.dataPredict,
        };
        // setLoading(false)
        // console.log(dataSend);

        fetch('http://165.22.244.31:8000/api/inlab/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSend),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(actions.setPredictedValue(data));
                if (isChart)
                    setIsChart(true)
                else
                    setIsChart(!isChart)
            })
            .catch(error => console.error('Error:', error));
        // setLoading(true)
    };

    const handleReset = () => {
        dispatch(actions.setReset(true));
        dispatch(actions.setDataPredict('clear'));
        dispatch(actions.setPredictedValue(''));
        dispatch(actions.setCount(0))
        setIsChart(false)
    };

    const tabs = [
        { id: 'inlab1', text: 'Dự đoán Inlab1', content: <Lab /> },
        { id: 'inlab2', text: 'Dự đoán Inlab2', content: <Lab index={2} /> },
        { id: 'inlab3', text: 'Dự đoán Inlab3', content: <Lab index={3} /> },
        { id: 'inlab4', text: 'Dự đoán Inlab4', content: <Lab index={4} /> },
    ];

    useEffect(() => {
        setFadeIn(false);
        const timer = setTimeout(() => setFadeIn(true), 300);
        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <div className={clsx('container-fluid', style.root)}>
            <Header />
            <AnimatePresence mode='wait'>
                <motion.div
                    key="predict-final"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className={style.body}>
                        <h2 className={clsx(style.title, 'text-center', 'align-content-center')}>
                            Dự đoán điểm theo từng lab
                        </h2>

                        <ul className={clsx(style.tabContainer, 'nav nav-tabs row', style.frameButton)}>
                            {tabs.map((tab, index) => (
                                <div className={clsx('col-xl-2 col-lg-3 col-md-6', style.tab)} key={index}>
                                    <li
                                        className={clsx(
                                            index === 0 && style.tabButton1,
                                            index === 1 && style.tabButton2,
                                            index === 2 && style.tabButton3,
                                            index === 3 && style.tabButton4,
                                            'nav-item mt-2',
                                            style.tabButton,
                                            activeTab === index && style.active
                                        )}
                                        onClick={() => {
                                            handleReset();
                                            setActiveTab(index);
                                        }}
                                    >
                                        {tab.text}
                                    </li>
                                </div>
                            ))}
                        </ul>

                        <div className={clsx(style.tabContent, fadeIn && style.active)}>
                            {tabs[activeTab].content}
                            <div className={clsx(style.borderChart, isChart && 'd-block')}>
                                <div className="row">
                                    <div className={clsx(style.chart, 'col-12')}>
                                        <BarInlab />
                                    </div>
                                </div>
                            </div>
                            {/* {loading ? (<Loading />) : ( */}
                                <PredictionText />
                            {/* )} */}
                            <div className={clsx(style.interactionArea, 'row justify-content-center mb-lg-2')}>
                                <div className='col-6'>
                                    <button
                                        className={clsx(style.btnPredict, 'btn btn-success')}
                                        onClick={handlePredict}
                                    >
                                        <FontAwesomeIcon icon={faCircleQuestion} />&nbsp;Dự đoán
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <button
                                        className={clsx(style.btnReset, 'btn btn-danger')}
                                        onClick={handleReset}
                                    >
                                        <FontAwesomeIcon icon={faRotateLeft} />&nbsp;Xóa trắng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.footerTemp}></div>
                </motion.div>
            </AnimatePresence>
            <Footer />
        </div>
    );
}

export default PredictInlab;
