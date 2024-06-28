import React, { useEffect, useState } from "react";

const BIT_EXCHANGE = 0;
const CROWN_EXCHANGE = 1;

type ExRate = {
    crown: number;
    bit: number;
}

export default function CrownCalculator(): React.ReactElement {
    const exRateOrigin: string|null = localStorage.getItem("exRate");
    const exRate: ExRate = exRateOrigin ? JSON.parse(exRateOrigin) : { crown: 100, bit: 600000 };

    const [crown, setCrown] = useState<number|string>(exRate.crown);
    const [bit, setBit] = useState<number|string>(exRate.bit);
    const [target, setTarget] = useState<number|string>(0);
    const [toWhere, setToWhere] = useState<string|number>(BIT_EXCHANGE);
    const [exResult, setExResult] = useState(0);

    useEffect(() => {
        localStorage.setItem("exRate", JSON.stringify({ crown: Number(crown), bit: Number(bit) }));
        calculate();
    }, [crown, bit]);

    useEffect(() => {
        calculate();
    }, [target, toWhere]);

    const verifyValue = (event: React.ChangeEvent<HTMLInputElement>, prevValue: string|number, setValue: React.Dispatch<React.SetStateAction<string | number>>) => {
        if(event.target.value === "") {
            setValue(event.target.value);
            return;
        }

        const regex = /\D/g;
        const result = regex.exec(event.target.value);

        if(result) {
            setValue(prevValue);
            return;
        }

        setValue(Number(event.target.value));
    }

    const calculate = () => {
        let raw = 0;
        if(toWhere === BIT_EXCHANGE) {
            raw = (Number(crown) * Number(target)) / Number(bit);
        } else {
            raw = (Number(bit) * Number(target)) / Number(crown);
        }

        const temp = Math.round(raw * 10000);
        setExResult(temp / 10000);
    }

    return (
        <div className="content-shortcut">
            <div className="title">크라운 환산기</div>
            <div className="content">
                <div className="row flex-row">
                    <span className="no-width">크라운</span><input type="text" name="crown" id="crown" value={crown} onChange={(e) => verifyValue(e, crown, setCrown)}/>
                    <span className="no-width">:</span>
                    <span className="no-width">비트</span><input type="text" name="bit" id="bit" value={bit} onChange={(e) => verifyValue(e, bit, setBit)}/>
                </div>
                <div className="row flex-row">
                    <select name="ex-direction" id="ex-direction" value={toWhere} onChange={(e) => setToWhere(Number(e.target.value))}>
                        <option value={BIT_EXCHANGE}>비트 → 크라운</option>
                        <option value={CROWN_EXCHANGE}>크라운 → 비트</option>
                    </select>
                    <input type="text" name="target" id="target" value={target} onChange={(e) => verifyValue(e, target, setTarget)}/>
                    <span className="no-width">{toWhere === BIT_EXCHANGE ? "비트" : "크라운"}</span>
                </div>
                <hr />
                <div className="row">
                    <span>{exResult.toLocaleString("ko-KR")}</span>&nbsp;
                    <span className="no-width">{toWhere === BIT_EXCHANGE ? "크라운" : "비트"}</span>
                </div>
            </div>
        </div>
    );
}