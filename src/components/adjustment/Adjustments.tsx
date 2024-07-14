import React, { useMemo, useState } from "react";
import { Gauge, adjustAll, adjustFailToSuccess, adjustTwo, getDefaultGauges, getDefaultSpentItems, hasFailAdjust, hasSuccessedAdjustsOverTwo, isFirstAdjust } from "../../functions/adjustmentFunctions";
import Gauges from "./Gauges";
import Status from "./Status";
import { Item } from "../../classes";
import SpentItems from "./SpentItems";

export type SpentItem = {
    item: Item,
    count: number
}

export default function Adjustments(): React.ReactElement {
    const defaultGauges = getDefaultGauges();
    const defaultSpentItems = getDefaultSpentItems();

    const [position, setPosition] = useState(0);
    const [gauges, setGauges] = useState<Array<Gauge>>(defaultGauges);
    const [mode, setMode] = useState<String|null>(null);
    const [spentItems, setSpentItems] = useState<Array<SpentItem>>(defaultSpentItems);

    const movePosition = (event: React.MouseEvent) => {
        const button = event.target as HTMLButtonElement;
        let newPosition = position;
        if(button.id === "digivice_up") {
            newPosition--;
        } else if(button.id === "digivice_down") {
            newPosition++;
        }

        const list = document.querySelector(".screen-mover")! as HTMLUListElement;

        if(newPosition > 3) {
            const firstChild = [...list.children].at(0)!;
            list.append(firstChild.cloneNode(true));
            list.style.transition = "none";
            list.style.transform = "translateY(-180px)";
            firstChild.remove();
            setTimeout(() => {
                list.style.transition = "";
                list.style.transform = "translateY(-270px)";
                setPosition(3);
            }, 0);
            return;
        } else if(newPosition < 0) {
            const lastChild = [...list.children].at(-1)!;
            list.prepend(lastChild.cloneNode(true));
            list.style.transition = "none";
            list.style.transform = "translateY(-90px)";
            lastChild.remove();
            setTimeout(() => {
                list.style.transition = "";
                list.style.transform = "translateY(0px)";
                setPosition(0);
            }, 0);
            return;
        }

        list.style.transform = `translateY(-${newPosition * 90}px)`;
        setPosition(newPosition);
    }

    const selectPosition = () => {
        const list = document.querySelector(".screen-mover")!;
        const selected = ([...list.children].at(position)!.children[0] as HTMLSpanElement).dataset.id!;

        switch(selected) {
            case "first": {
                if(!isFirstAdjust(gauges)) {
                    alert("교정이 되지 않은 상태에서만 가능합니다.\n모두 재교정으로 다시 시도하세요.");
                    return;
                }
                firstAdjust();
                return;
            }
            case "failed": {
                if(isFirstAdjust(gauges)) {
                    alert("최초 교정 이후 가능합니다.\n최초 교정으로 다시 시도하세요.");
                    return;
                }
                if(!hasFailAdjust(gauges)) {
                    alert("더이상 실패한 교정이 없습니다.\n부분 재교정으로 더 높은 스텟을 뽑아보세요.");
                    return;
                }
                setMode("failed");
                return;
            }
            case "reroll-part": {
                if(isFirstAdjust(gauges)) {
                    alert("최초 교정 이후 가능합니다.\n최초 교정으로 다시 시도하세요.");
                    return;
                }
                if(!hasSuccessedAdjustsOverTwo(gauges)) {
                    alert("최소 2개의 성공한 교정이 필요합니다.\n실패 재교정이나 모두 재교정을 통해\n2개 이상의 성공한 교정을 확보하세요.");
                    return;
                }
                setMode("part");
                return;
            }
            case "reroll": {
                if(isFirstAdjust(gauges)) {
                    alert("최초 교정 이후 가능합니다.\n최초 교정으로 다시 시도하세요.");
                    return;
                }
                rerollAll();
                return;
            }
            default: return;
        }
    }

    const firstAdjust = () => {
        const newGauges = adjustAll();
        spentItems[0].count++;

        setSpentItems([...spentItems]);
        setGauges(newGauges);
    }

    const rerollEach = (index: number) => {
        const newGauges = adjustFailToSuccess(gauges, index);
        spentItems[1].count += newGauges.count;
        
        setSpentItems([...spentItems]);
        setGauges(newGauges.guages);
        setMode(null);
    }

    const rerollPart = (indexes: Array<number>) => {
        const newGauges = adjustTwo(gauges, indexes);
        spentItems[2].count += newGauges.count;
        
        setSpentItems([...spentItems]);
        setGauges(newGauges.guages);
        setMode(null);
    }

    const rerollAll = () => {
        const newGauges = adjustAll();
        spentItems[0].count++;

        setSpentItems([...spentItems]);
        setGauges(newGauges);
    }

    const digiviceSimulator = useMemo(() => {
        return <div className="digivice-simulator">
                    <div className="digivice-container">
                        <img src="/images/디지바이스_시뮬.png" className="digivice "/>
                        <div className="digivice-screens">
                            <ul className="screen-mover">
                                <li><span data-id="first">최초 교정</span></li>
                                <li><span data-id="failed">실패 재교정</span></li>
                                <li><span data-id="reroll-part">부분 재교정</span></li>
                                <li><span data-id="reroll">모두 재교정</span></li>
                            </ul>
                        </div>
                        <button type="button" className="select-button" 
                                id="digivice_up" style={{ top: "56px", left: "214px" }}
                                onClick={movePosition}>
                            <img src="/images/디지바이스_윗_버튼.png" />
                        </button>
                        <button type="button" className="select-button" 
                                id="digivice_down" style={{ top: "113px", left: "204px" }}
                                onClick={movePosition}>
                            <img src="/images/디지바이스_아랫_버튼.png" />
                        </button>
                        <button type="button" className="select-button" 
                                id="digivice_select" style={{ top: "93px", left: "20px" }}
                                onClick={selectPosition}>
                            <img src="/images/디지바이스_선택_버튼.png" />
                        </button>
                    </div>
                </div>;
    }, [position, gauges]);

    return (
        <div className="main">
            { digiviceSimulator }

            <Gauges gauges={gauges} mode={mode} setMode={setMode} rerollEach={rerollEach} rerollPart={rerollPart}/>

            <div className="adjust-dashboard">
                <Status gauges={gauges} />
                <SpentItems spentItems={spentItems} />
            </div>
        </div>
    );
}