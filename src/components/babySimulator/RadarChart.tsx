import React, { useMemo } from "react";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Filler, LineElement, PointElement, RadialLinearScale, Tooltip, defaults } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import { IWeighted } from "../../functions/babySimulatorFunctions";

type RadarChartProps = {
    weighted: IWeighted
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

export default function RadarChart({ weighted }: RadarChartProps): React.ReactElement {
    const chartData = {
        labels: ["HP", "STR", "INT", "DEF", "RES", "SPD", "SP"],
        datasets: [
            {
                label: '가중치',
                data: [ 
                    weighted["HP"],
                    weighted["STR"],
                    weighted["INT"],
                    weighted["DEF"],
                    weighted["RES"],
                    weighted["SPD"],
                    weighted["SP"],
                ],
                backgroundColor: '#0a53a8',
                pointBackgroundColor: "#bfe1f6",
                fill: true,
                pointBorderColor: '#bfe1f6',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#fff'
            },
        ],
    }

    const chartOptions: ChartOptions<'radar'> & ChartOptions = useMemo(() => {
        return {
            elements: {
                //데이터 속성.
                line: {
                    borderWidth: 2,
                    borderColor: "#bfe1f6",
                },
                point: {
                    radius: 2.5
                }
            },
            scales: {
                r: {
                    ticks: {
                        stepSize: 20,
                        display: false,
                    },
                    grid: {
                        color: "#CDCDCD",
                    },
                    //라벨 속성 지정.
                    pointLabels: {
                        font: {
                            size: 12,
                            weight: 700,
                            family: 'Pretendard',
                        },
                        color: "#CDCDCD",
                    },
                    angleLines: {
                        display: false,
                    },
                    suggestedMin: 0,
                    suggestedMax: 40,
                },
            },
            //위에 생기는 데이터 속성 label 타이틀을 지워줍니다.
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        footer: (tooltipItems: any) => {
                            const statName = tooltipItems[0].label;
                            const value = weighted[statName];
                            const sum = Object.values(weighted).reduce((a, b) => a + b);
                            const percent = Math.floor((value / sum) * 100_000) / 1_000;

                            return `등장확률 : ${percent}%`;
                        }
                    }
                }
            },
            animation: {
                easing: "easeInOutQuad",
                duration: 200,
            },
            interaction: {
                mode: "point",
                intersect: false
            }
        };
    }, [weighted]);

    return (
        <div className="chart-container">
            <Radar data={chartData} options={chartOptions} />
        </div>
    );
}