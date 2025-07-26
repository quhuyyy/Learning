import { useMemo, useState } from 'react';
import clsx from 'clsx';

import { useStore, actions } from '../../../store';
import style from './InputGroupFinal.module.css'
import InputFinal from '../InputFinal/InputFinal';

function InputGroupFinal({ index = 1 }) {

    const [state, dispatch] = useStore()

    const nameObject = `Lab${index}`;

    const initData = useMemo(() => ({
        Prelab: '',
        Inlab: '',
    }), [])

    const [inputData, setInputData] = useState(initData)

    const handleChange = (field) => (e) => {
        var value = parseFloat(e.target.value)
        const newData = {
            ...inputData,
            [field]: value
        }
        setInputData(newData)
        dispatch(actions.setDataPredictFinal({
            ...state.dataPredictFinal,
            [nameObject]: newData
        }));
    };


    return (
        <div className={clsx(style.root, 'form-control mb-4', style[`inputGroup${index}`])}>
            <span style={{ fontWeight: 'bold' }}>{`Lab ${index}`}</span>
            <div className='row'>
                <div className="col-md-6">
                    <InputFinal
                        label={`Điểm Prelab`}
                        id={`Prelab${index}`}
                        name='predictQuestion'
                        value={inputData.Prelab}
                        placeholder="Nhập điểm Prelab"
                        min={0}
                        max={10}
                        onChange={handleChange('Prelab')}
                        // ref={prelabRef}
                    />
                </div>
                <div className="col-md-6">
                    <InputFinal
                        label={`Điểm Inlab`}
                        id={`Inlab${index}`}
                        name='predictQuestion'
                        value={inputData.Inlab}
                        placeholder="Nhập điểm Inlab"
                        min={0}
                        max={10}
                        onChange={handleChange('Inlab')}
                        // ref={inlabRef}
                    />
                </div>
            </div>
        </div>
    )
}
export default InputGroupFinal