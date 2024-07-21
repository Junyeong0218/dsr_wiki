import React, { useState } from "react";
import { Gauge } from "../../functions/adjustmentFunctions";
import { toInteger } from "lodash";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

type GaugesType = { 
    gauges: Array<Gauge>, 
    mode: String|null, 
    setMode: React.Dispatch<React.SetStateAction<String | null>>,
    rerollEach: (index: number) => void,
    rerollPart: (indexes: Array<number>) => void
}

export default function Gauges({ gauges, mode, setMode, rerollEach, rerollPart }: GaugesType): React.ReactElement {
    const [failed, setFailed] = useState(-1);
    const [parts, setParts] = useState([-1, -1]);

    const selectFailed = (event: React.MouseEvent, index: number) => {
        const div = event.target as HTMLDivElement;
        if(div.classList.contains("selectable") || div.classList.contains("selected")) {
            setFailed(index);
        }
    }

    const selectParts = (event: React.MouseEvent, index: number) => {
        const div = event.target as HTMLDivElement;
        if(div.classList.contains("selectable") || div.classList.contains("selected")) {
            let secondIndex = gauges.findIndex((gauge, i) => i > index && (gauge.type !== "NONE" && gauge.type !== "FAIL"));
            if(secondIndex === -1) {
                secondIndex = gauges.findIndex((gauge, i) => i < index && (gauge.type !== "NONE" && gauge.type !== "FAIL"));
            }

            if(secondIndex === -1) return;

            const newParts = [index, secondIndex];
            setParts(newParts);
        }
    }

    const submit = () => {
        if(!mode) {
            setMode(null);
            return;
        }

        if(mode === "failed" && failed !== -1) {
            rerollEach(failed);
            setFailed(-1);
            return;
        }

        if(mode === "part" && parts[0] !== -1 && parts[1] !== -1) {
            rerollPart(parts);
            setParts([-1, -1]);
            return;
        }
    }

    const cancel = () => {
        setFailed(-1);
        setParts([-1, -1]);
        setMode(null);
    }

    return (
        <div className="gauges-container">
            { mode === "failed" ? 
                <div className="help-text">실패한 교정을 선택하세요.</div> : 
              mode === "part" ? 
                <div className="help-text">연속한 교정 2개를 선택하세요.</div> : ""
            }
            <div className="gauges">
                { gauges.map((gauge, index) => {
                    if(gauge.type === "NONE") 
                        return <div className="gauge" key={getUUID()}>
                                    <img src={`${IMG_URL_BASE}/교정_빈칸.png`} />
                                </div>;
                    if(gauge.type === "FAIL") 
                        return <div className={`gauge ${mode === "failed" ? index === failed ? "selected" : "selectable" : ""}`}
                                    onClick={(event) => selectFailed(event, index)}
                                    key={getUUID()}>
                                    <img src={`${IMG_URL_BASE}/교정_실패.png`} />
                                </div>;

                    return <div className={`gauge ${mode === "part" ? parts.includes(index) ? "selected" : "selectable" : ""}`}
                                onClick={(event) => selectParts(event, index)}
                                key={getUUID()}>
                                <span>{gauge.type} {toInteger(gauge.value * 100)}%</span>
                                <img src={`${IMG_URL_BASE}/교정_성공.png`} />
                            </div>
                })}
            </div>
            { mode !== null && 
                <div className="buttons">
                    <button type="button" className="submit-button" onClick={submit}>적용</button>
                    <button type="button" className="cancel-button" onClick={cancel}>취소</button>
                </div>
            }
        </div>
        
    );
}