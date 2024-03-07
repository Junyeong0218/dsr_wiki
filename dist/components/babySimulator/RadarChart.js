"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_chartjs_2_1 = require("react-chartjs-2");
const chart_js_1 = require("chart.js");
chart_js_1.Chart.register(chart_js_1.RadialLinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Filler, chart_js_1.Tooltip);
function RadarChart({ weighted }) {
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
    };
    const chartOptions = (0, react_1.useMemo)(() => {
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
                        footer: (tooltipItems) => {
                            const statName = tooltipItems[0].label;
                            const value = weighted[statName];
                            const sum = Object.values(weighted).reduce((a, b) => a + b);
                            const percent = Math.floor((value / sum) * 100000) / 1000;
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
    return (react_1.default.createElement("div", { className: "chart-container" },
        react_1.default.createElement(react_chartjs_2_1.Radar, { data: chartData, options: chartOptions })));
}
exports.default = RadarChart;
