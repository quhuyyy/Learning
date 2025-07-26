import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import { actions, useStore } from "../../../store";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";

function BarInlab() {

    const [state, dispatch] = useStore()

    const [dataDraw, setDataDraw] = useState([]);
    const [col, setCol] = useState([]);

    useEffect(() => {
        var score = parseInt(state.predictedValue[0])
        var count = 1
        var dataSend = state.dataPredict
        let rng = seedrandom(dataSend)
        var salt = Math.floor(rng()* 2) + 1;

        let newDataDraw = [];
        let newCol = [];

        if (!isNaN(score)) {
            while (score !== 5) {
                for (var i = 0; i < salt; i++) {
                    newCol.push(`Lần ${count}`);
                    count++;
                    newDataDraw.push(score);
                    if(score === 4) {
                        break
                    }
                }
                score += 1;
                salt = Math.floor(rng() * 2) + 1;
            }
        }

        setDataDraw(newDataDraw);
        setCol(newCol);
        dispatch(actions.setCount(count - 1))
        
    }, [state.predictedValue, dispatch])
    //Không để state.dataPredict vào vì đang là two-way binding

    // console.log(col);
    // console.log(dataDraw);

    const yAxisLabels = ['Từ 0 đến 4', "Từ trên 4 đến 5.5", "Từ trên 5.5 đến 7", "Từ trên 7 đến 8.5", "Từ trên 8.5 đến 10"];

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
            categories: col,
            crosshair: true,
        },
        yAxis: [{
            title: {
                text: 'Khoảng điểm của bạn khi làm bài',
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }
            },
            labels: {
                formatter: function () {
                    return yAxisLabels[this.value];
                },
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: '#666666'
                }
            },
            tickPositions: [0, 1, 2, 3, 4],
            min: 0,
            max: 4,
        }],
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false,
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
                    var text = ""
                    switch (point.y) {
                        case 0: {
                            text = "Từ 0 đến 4"
                            break
                        }
                        case 1: {
                            text = "Từ trên 4 đến 5.5"
                            break
                        }
                        case 2: {
                            text = "Từ trên 5.5 đến 7"
                            break
                        }
                        case 3: {
                            text = "Từ trên 7 đến 8.5"
                            break
                        }
                        case 4: {
                            text = "Từ trên 8.5 đến 10"
                            break
                        }
                        default: 
                            throw new Error("Lỗi dữ liệu trả về");
                            
                    }
                    // console.log(s);
                    return `${s}<li style="list-style-type: none; margin-left: -30px;"><span style="color:${point.color};font-size: 12px;">●</span> <span style="font-size: 12px;">${point.series.name}: ${text} </span></li>`;
                }, `<span><b class="hello" style="margin-left: -30px;">${this.x}</b></span>`);
                return '<ul style="margin-bottom: -2px">' + t + '</ul>'
            },
            positioner: function (labelWidth, labelHeight, point) {
                let y = point.plotY;
                if (point.negative) {
                    y = 70;
                }
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
                name: 'Điểm của bạn',
                type: 'column',
                color: '#75d1ff',
                data: dataDraw
            },
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

export default BarInlab;