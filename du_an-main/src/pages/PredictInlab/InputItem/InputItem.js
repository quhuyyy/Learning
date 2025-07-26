import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import { useStore, actions } from '../../../store';
import style from './InputItem.module.css'
import InputField from '../InputField/InputField'

function InputItem({ index = 1, lab }) {

  // const maxScoreRef = useRef()
  // const minScoreRef = useRef()
  // const attemptsRef = useRef()
  // const numberOfQuestionRef = useRef()

  // useEffect(() => {
  //   console.log(maxScoreRef.current);
  //   console.log(minScoreRef.current);
  //   console.log(attemptsRef.current);
  //   console.log(numberOfQuestionRef.current);
    
  // })

  const nameObject = `${lab}${index}`;

  const [state, dispatch] = useStore()

  const initData = useMemo(() => ({
    nameObject: nameObject,
    maxScore: "",
    minScore: "",
    attempts: "",
    numberOfQuestion: ""
  }), [nameObject])

  const [inputData, setInputData] = useState(initData)

  useEffect(() => {
    if (state.reset) {
      setInputData(initData)
      dispatch(actions.setReset(false))
    }
  }, [state.reset, initData, dispatch])

  const handleChange = (field) => (e) => {
    var value = parseFloat(e.target.value)
    const newData = {
      ...inputData,
      [field]: value
    }
    setInputData(newData)
    dispatch(actions.setDataPredict(newData))
  };

  return (
    <div className={clsx(style.root, 'form-control', (lab.slice(0, 1) === 'I' && style.inlabColor))}>
      <span>{lab}{index}</span>
      <div className='row'>
        <div className="col-md-6">
          <InputField
            label="Điểm cao nhất"
            id={`${lab}${index}-maxScore`}
            name='predictInlab'
            value={inputData.maxScore}
            placeholder="Nhập điểm cao nhất"
            min={0}
            max={10}
            onChange={handleChange('maxScore')}
            // ref={maxScoreRef}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Điểm thấp nhất"
            id={`${lab}${index}-minScore`}
            name='predictInlab'
            value={inputData.minScore}
            placeholder="Nhập điểm thấp nhất"
            min={0}
            max={10}
            onChange={handleChange('minScore')}
            // ref={minScoreRef}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <InputField
            label="Số lần làm"
            id={`${lab}${index}-attempts`}
            name='predictInlab'
            value={inputData.attempts}
            placeholder="Nhập số lần làm"
            min={1}
            onChange={handleChange('attempts')}
            // ref={attemptsRef}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Số câu hỏi"
            id={`${lab}${index}-numberOfQuestion`}
            name='predictInlab'
            value={inputData.numberOfQuestion}
            placeholder="Nhập số câu hỏi"
            min={1}
            onChange={handleChange('numberOfQuestion')}
            // ref={numberOfQuestionRef}
          />
        </div>
      </div>
    </div>
  )
}
export default InputItem