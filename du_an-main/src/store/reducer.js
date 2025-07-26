import { SET_PREDICTED_VALUE, SET_DATA_PREDICT, SET_RESET, SET_PREDICTED_VALUE_FINAL, SET_ANALYSIS_VALUE_FINAL, SET_DATA_PREDICT_FINAL, SET_DATA_PREDICT_QUESTION, SET_PREDICTED_VALUE_QUESTION, SET_COUNT, SET_TOPIC, SET_LAB, SET_RESET_QUESTION, SET_ACCESS } from "./constants"


const initState = {
    dataPredict: [],
    reset: false,
    predictedValue: "",
    count: 0,

    dataPredictFinal: {
        Lab1: {
            "Prelab": 0,
            "Inlab": 0
        },
        Lab2: {
            "Prelab": 0,
            "Inlab": 0
        },
        Lab3: {
            "Prelab": 0,
            "Inlab": 0
        },
        Lab4: {
            "Prelab": 0,
            "Inlab": 0
        }
    },
    resetQuestion: false,
    analysisValueFinal: [],
    predictedValueFinal: "",
    lab: "",

    dataPredictQuestion: {},
    predictedValueQuestion: '',
    topic: [],

    access: {
        "analytics_data": [
            {
                "event_name": "page_view",
                "event_count": "",
                "active_users": ""
            },
            {
                "event_name": "scroll",
                "event_count": "",
                "active_users": ""
            },
            {
                "event_name": "user_engagement",
                "event_count": "",
                "active_users": ""
            },
            {
                "event_name": "session_start",
                "event_count": "",
                "active_users": ""
            },
            {
                "event_name": "first_visit",
                "event_count": "",
                "active_users": ""
            }
        ]
    }
}

function reducer(state, action) {

    switch (action.type) {
        case SET_DATA_PREDICT: {
            // console.log(action);
            if (action.payload === "clear") {
                return {
                    ...state,
                    dataPredict: []
                }
            }

            const existingIndex = state.dataPredict.findIndex(item => item.nameObject === action.payload.nameObject);

            if (existingIndex !== -1) {
                const updatedData = [...state.dataPredict];
                updatedData[existingIndex] = action.payload;
                return {
                    ...state,
                    dataPredict: updatedData,
                };
            } else {
                return {
                    ...state,
                    dataPredict: [...state.dataPredict, action.payload]
                }
            }
        }
        case SET_PREDICTED_VALUE:
            return {
                ...state,
                predictedValue: action.payload
            }
        case SET_RESET:
            return {
                ...state,
                reset: action.payload
            }
        case SET_RESET_QUESTION:
            return {
                ...state,
                resetQuestion: action.payload
            }
        case SET_PREDICTED_VALUE_FINAL:
            return {
                ...state,
                predictedValueFinal: action.payload
            }
        case SET_ANALYSIS_VALUE_FINAL:
            return {
                ...state,
                analysisValueFinal: action.payload
            }
        case SET_DATA_PREDICT_FINAL:
            return {
                ...state,
                dataPredictFinal: action.payload
            }
        case SET_DATA_PREDICT_QUESTION:
            if (action.payload === "clear") {
                return {
                    ...state,
                    dataPredictQuestion: []
                }
            }
            return {
                ...state,
                dataPredictQuestion: action.payload
            }
        case SET_PREDICTED_VALUE_QUESTION:
            return {
                ...state,
                predictedValueQuestion: action.payload
            }
        case SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case SET_TOPIC:
            return {
                ...state,
                topic: action.payload
            }
        case SET_LAB:
            return {
                ...state,
                lab: action.payload
            }
        case SET_ACCESS:
            return {
                ...state,
                access: action.payload
            }
        default:
            throw new Error("Invalid Action");
    }
}

export { initState }
export default reducer