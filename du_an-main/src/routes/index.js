import HomePage from "../pages/HomePage/HomePage"
import Login from '../pages/Login/Login'
import PredictInlab from "../pages/PredictInlab/PredictInlab"
import PredictFinalScore from "../pages/PredictFinalScore/PredictFinalScore"
import PredictBaseOnQuesstion from "../pages/PredictBaseOnQuestion/PredictBaseOnQuestion"

const publicRoutes = [
    {path: '/', component: HomePage },
    {path: '/login', component: Login},
    {path: '/predict-page/bai-toan-1', component: PredictInlab},
    {path: '/predict-page/bai-toan-2', component: PredictBaseOnQuesstion},
    {path: '/predict-page/bai-toan-3', component: PredictFinalScore}
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }