import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import { useStore } from "../../../store";

function Bar() {

    const [state] = useStore()

    const dataDraw = {
        dataOne: [
            state.dataPredictFinal?.Lab1?.Prelab || 0,
            state.dataPredictFinal?.Lab1?.Inlab || 0,
            state.dataPredictFinal?.Lab2?.Prelab || 0,
            state.dataPredictFinal?.Lab2?.Inlab || 0,
            state.dataPredictFinal?.Lab3?.Prelab || 0,
            state.dataPredictFinal?.Lab3?.Inlab || 0,
            state.dataPredictFinal?.Lab4?.Prelab || 0,
            state.dataPredictFinal?.Lab4?.Inlab || 0
        ],
        dataAll: state.analysisValueFinal || []
    }



    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#EEF5FF',
            zoomType: 'xy'
        },
        accessibility: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: ['Prelab 1', 'Inlab 1', 'Prelab 2', 'Inlab 2', 'Prelab 3', 'Inlab 3', 'Prelab 4', 'Inlab 4'],
            crosshair: true,
        },
        yAxis: [{
            min: 0,
            max: 15,
            title: {
                text: 'Điểm của bạn',
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }
            }
        }],
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    y: 0,
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#000000'
                    },
                    useHTML: true
                },
                pointPadding: 0.2,
                borderWidth: 0
            },
            spline: {
                lineWidth: '3px'
            }
        },
        tooltip: {
            formatter: function () {
                var t = this.points.reduce(function (s, point) {
                    let text = point.y + "";
                    // console.log(s);
                    return `${s}<li style="list-style-type: none; margin-left: -30px;"><span style="color:${point.color};font-size: 12px;">●</span> <span style="font-size: 12px;">${point.series.name} ${text}</span></li>`;
                }, `<span><b class="hello" style="margin-left: -30px;">${this.x}</b></span>`);
                return '<ul style="margin-bottom: -2px">' + t + '</ul>'
            },
            positioner: function (labelWidth, labelHeight, point) {
                let y = point.plotY;
                if (point.negative) {
                    y = 70;
                }
                // let x = point.plotX;
                // if (point > )
                // console.log(x);

                return {
                    x: point.plotX,
                    y: y
                }
            },
            shared: true,
            useHTML: true,
        },
        series: [
            {
                name: 'Điểm của bạn: ',
                type: 'column',
                color: '#fa6c51',
                data: dataDraw.dataOne
            },
            {
                name: 'Điểm trung bình sinh viên: ',
                type: 'spline',
                color: '#fdcd56',

                data: dataDraw.dataAll
            }
        ]
    }
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default Bar;