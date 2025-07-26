import { Link } from "react-router-dom"
import style from './HomePage.module.scss'
import clsx from 'clsx'

function HomePage() {

    const tabs = [
        {
            id: 'bai-toan-1',
            text: 'Dự đoán điểm Inlab theo Prelab',
        },
        {
            id: 'bai-toan-2',
            text: 'Dự đoán điểm dựa trên ngữ cảnh',
        },
        {
            id: 'bai-toan-3',
            text: 'Dự đoán điểm thi cuối kỳ',
        }
    ]

    return (

        <div className={clsx(style.root, 'container-fluid')}>
            <div className={style.stars1}></div>
            <div className={style.stars2}></div>
            <div className={style.stars3}></div>
            <div className='row'>
                <div
                    className={clsx(style.title, 'col-lg-12')}
                >
                    <span>
                        CÔNG CỤ DỰ ĐOÁN KẾT QUẢ HỌC TẬP <br />& GỢI Ý CẢI THIỆN CHO NGƯỜI HỌC
                    </span>
                </div>
                {tabs.map((item, index) => {
                    return (
                        <div className={clsx('col-lg-4 mt-4', style.frameButton)} key={index}>
                            <Link
                                className={clsx(style.button, 'btn', style[`button${index + 1}`])}
                                to={`/predict-page/${item.id}`}
                            >
                                {item.text}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default HomePage