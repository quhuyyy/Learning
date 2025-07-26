import clsx from "clsx"
import { memo, useMemo } from "react"

import { useStore } from "../../../store"
import style from './PredictTextFinalScore.module.css'


function PredictTextFinalScore() {

  const [state] = useStore()

  const value = useMemo(() => {
    const nameLab = state.lab

    switch (parseInt(state.predictedValueFinal)) {
      case 0: {
        return `Điểm của bạn bé hơn 4, bạn cần cải thiện ${nameLab}`
      }
      case 1: {
        return `Điểm của bạn từ 4 đến 5.5, bạn cần cải thiện ${nameLab}`
      }
      case 2: {
        return `Điểm của bạn từ 5.5 đến 7, bạn cần cải thiện ${nameLab}`
      }
      case 3: {
        return `Điểm của bạn từ 7 đến 8.5, bạn cần cải thiện ${nameLab}`
      }
      case 4: {
        return `Điểm của bạn từ 8.5 đến 10`
      }
      default: {
        return ""
      }
    }
  }, [state.predictedValueFinal, state.lab])

  return (
    <>
      <div className={clsx(style.label, 'col-lg-3 text-end mt-2')}>
        <label className={clsx('mb-md-2 mt-lg-2')}>Kết quả dự đoán</label>
      </div>
      <div className={clsx("col-lg-8 mt-2", style.input)}>
        <input
          className='form-control'
          disabled
          value={value}
        />
      </div>
    </>
  )
}

export default memo(PredictTextFinalScore)