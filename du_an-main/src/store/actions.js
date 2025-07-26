import { SET_PREDICTED_VALUE, SET_DATA_PREDICT, SET_RESET, SET_PREDICTED_VALUE_FINAL, SET_ANALYSIS_VALUE_FINAL, SET_DATA_PREDICT_FINAL, SET_DATA_PREDICT_QUESTION, SET_PREDICTED_VALUE_QUESTION, SET_COUNT, SET_TOPIC, SET_LAB, SET_RESET_QUESTION, SET_ACCESS } from "./constants"


export const setPredictedValue = (payload) => ({
    type: SET_PREDICTED_VALUE,
    payload
})

export const setDataPredict = (payload) => ({
    type: SET_DATA_PREDICT,
    payload,
})

export const setReset = (payload) => ({
    type: SET_RESET,
    payload
})

export const setResetQuestion = (payload) => ({
    type: SET_RESET_QUESTION,
    payload
})

export const setPredictedValueFinal = (payload) => ({
    type: SET_PREDICTED_VALUE_FINAL,
    payload
})

export const setAnalysisValueFinal = (payload) => ({
    type: SET_ANALYSIS_VALUE_FINAL,
    payload
})

export const setDataPredictFinal = (payload) => ({
    type: SET_DATA_PREDICT_FINAL,
    payload
})

export const setDataPredictQuestion = (payload) => ({
    type: SET_DATA_PREDICT_QUESTION,
    payload
})

export const setPredictedValueQuestion = (payload) => ({
    type: SET_PREDICTED_VALUE_QUESTION,
    payload
})

export const setCount = (payload) => ({
    type: SET_COUNT,
    payload
})

export const setTopic = (payload) => ({
    type: SET_TOPIC,
    payload
})

export const setLab = (payload) => ({
    type: SET_LAB,
    payload
})

export const setAccess = (payload) => ({
    type: SET_ACCESS,
    payload
})