import React, { useRef, useState } from "react";
import { Potential, PotentialGroup, generateTenPotentials, getDefaultPotentials, getTotalStats } from "../../functions/potentialFunctions";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

type Cell = {
    tag: HTMLElement|undefined,
    coord: {
        row: number,
        column: number
    }
}

export default function Potentials(): React.ReactElement {
    const defaultPotentials = getDefaultPotentials();

    const [potentials, setPotentials] = useState< Array<Array<Potential>> >(defaultPotentials);
    const [list, setList] = useState<Array<PotentialGroup>>([]);
    const [bit, setBit] = useState(0);

    const selected = useRef<PotentialGroup>();

    const stats = getTotalStats(potentials);

    const loadList = () => {
        const list = generateTenPotentials();
        
        setBit(bit + 50_000);
        setList(list);
    }

    const grabCube = (event: React.DragEvent) => {
        const targetElement = event.target as HTMLDivElement;
        const potentialContainer = document.querySelector(".potentials")!;
        const index = [...potentialContainer.children].findIndex(e => e === targetElement);

        selected.current = list[index];

        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
    }

    const getNextCell = (datasetId: string): Cell => {
        if(!selected.current) return {
            tag: undefined, coord: {row: -1, column: -1}
        };

        const [rowIndex, columnIndex] = datasetId.split("-").map(e => Number(e));
        const rows = document.querySelectorAll("table > tbody > tr")!;
        let cell;
        if(selected.current.type === "ROW") {
            cell = {
                tag: rows[rowIndex].children[columnIndex + 1] as HTMLElement,
                coord: { row: rowIndex, column: columnIndex + 1}
            }
        } else if(selected.current.type === "COLUMN") {
            cell = {
                tag: rows[rowIndex + 1]?.children[columnIndex] as HTMLElement,
                coord: { row: rowIndex + 1, column: columnIndex}
            }
        } else if(selected.current.type === "RIGHT_DOWN") {
            cell = {
                tag: rows[rowIndex + 1]?.children[columnIndex + 1] as HTMLElement,
                coord: { row: rowIndex + 1, column: columnIndex + 1}
            }
        } else {
            cell = {
                tag: rows[rowIndex + 1]?.children[columnIndex - 1] as HTMLElement,
                coord: { row: rowIndex + 1, column: columnIndex - 1}
            }
        }

        return cell;
    }

    const changeToPreview = (cell: HTMLElement, potential: Potential) => {
        const children = [...cell.children];
        (children[0] as HTMLImageElement).src = `/images/포텐셜_${potential.statType}.png`;
        (children[1] as HTMLSpanElement).innerText = `${potential.statType} ${potential.value}%`;
        cell.classList.remove("blank");
        cell.classList.add("preview");
    }

    const changeToOrigin = (cell: HTMLElement, potential: Potential) => {
        const children = [...cell.children];
        (children[0] as HTMLImageElement).src = `/images/포텐셜_${potential.statType}.png`;
        (children[1] as HTMLSpanElement).innerText = `${potential.statType} ${potential.value}%`;
        if(potential.statType === "BLANK")
            cell.classList.add("blank");
        cell.classList.remove("preview");
    }

    const previewCube = (event: React.DragEvent) => {
        event.preventDefault();
        if(!selected.current) return;

        const td = event.target as HTMLElement;
        changeToPreview(td, selected.current.potentials[0]);

        if(selected.current.type === "ONE") return;

        const nextCell = getNextCell(td.dataset.id!);

        if(!nextCell.tag) return;

        changeToPreview(nextCell.tag, selected.current.potentials[1]);
    }

    const undo = (event: React.DragEvent) => {
        event.preventDefault();
        setPotentials([...potentials]);

        // const td = event.target as HTMLTableCellElement;
        // const [row, column] = td.dataset.id!.split("-").map(e => Number(e));
        // const potential = potentials[row][column];

        // changeToOrigin(td, potential);

        // if(selected.current!.type === "ONE") return;

        // const nextCell = getNextCell(td.dataset.id!);

        // if(!nextCell.tag) return;

        // const origin = potentials[nextCell.coord.row][nextCell.coord.column];
        // changeToOrigin(nextCell.tag, origin);
    }

    const apply = (event: React.DragEvent) => {
        event.preventDefault();
        if(!selected.current) return;

        const target = event.target as HTMLElement;
        const [row, column] = target.dataset.id!.split("-").map(e => Number(e));
        
        if(selected.current.type == "ONE") {
            potentials[row][column] = selected.current.potentials[0];
            setPotentials([...potentials]);
            setList(list.filter(e => e !== selected.current));
            selected.current = undefined;
            return;
        }

        const nextCell = getNextCell(target.dataset.id!);

        if(!nextCell.tag) {
            changeToOrigin(target, potentials[row][column]);
            return;
        }
        
        potentials[row][column] = selected.current.potentials[0];
        potentials[nextCell.coord.row][nextCell.coord.column] = selected.current.potentials[1];
        
        setPotentials([...potentials]);
        setList(list.filter(e => e !== selected.current));
        selected.current = undefined;
    }

    const getSpanClassName = (statType: string): string => {
        if(statType === "저항" || statType === "힘" || statType === "지능" || statType === "크리율")
            return "white";

        return "";
    }
    
    return (
        <div className="main">
            <div className="potential-board-container">
                <div className="potential-board">
                    <table>
                        <tbody key={getUUID()}>
                            { potentials.map((row, rowIndex) => (
                                <tr key={getUUID()}>
                                    { row.map((cell, columnIndex) => (
                                        <td key={getUUID()} className={`${cell.statType === "BLANK" ? "blank" : ""}`} 
                                            onDragEnter={previewCube} 
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragLeave={undo} 
                                            onDrop={apply} 
                                            onDragEnd={(e) => e.preventDefault()}
                                            data-id={`${rowIndex}-${columnIndex}`}>
                                            <img src={`${IMG_URL_BASE}/포텐셜_${cell.statType}.png`} />
                                            <span className={getSpanClassName(cell.statType)}>{cell.statType} {cell.value}%</span>
                                        </td>
                                    )) }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="stats">
                        { stats.map(stat => (
                            <div className="stat" key={getUUID()}>
                                <span className="title">{stat.statType}</span>
                                <span className={stat.value !== 0 ? "value" : ""}>+{stat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="spent-bits">
                    소모 비트 : {bit.toLocaleString("ko-KR")} <img src={`${IMG_URL_BASE}/무배경_bit.png`} alt="" />
                </div>
            </div>
            <div className="potentials">
                { list.map(element => {
                    if(element.type === "ONE")
                        return <div className="potential-group one" draggable="true" key={getUUID()} onDragStart={grabCube} onDragEnd={(e) => e.preventDefault()}>
                                    <img src={`${IMG_URL_BASE}/포텐셜_${element.potentials[0].statType}.png`} />
                                    <span className={getSpanClassName(element.potentials[0].statType)}>
                                        {element.potentials[0].statType} {element.potentials[0].value}%
                                    </span>
                                </div>;
                    else if(element.type === "ROW" || element.type === "COLUMN")
                        return <div className={`potential-group ${element.type.toLowerCase()}`} draggable="true" onDragStart={grabCube} key={getUUID()} onDragEnd={(e) => e.preventDefault()}>
                                    { element.potentials.map(p => (
                                            <div className="potential" key={getUUID()}>
                                                <img src={`${IMG_URL_BASE}/포텐셜_${p.statType}.png`} />
                                                <span className={getSpanClassName(p.statType)}>{p.statType} {p.value}%</span>
                                            </div>
                                    )) }
                                </div>;
                    else if(element.type === "RIGHT_UP")
                        return <div className={`potential-group ${element.type.toLowerCase()}`} draggable="true" key={getUUID()} onDragStart={grabCube} onDragEnd={(e) => e.preventDefault()}>
                                    <div className="potential blank"></div>
                                    <div className="potential">
                                        <img src={`${IMG_URL_BASE}/포텐셜_${element.potentials[0].statType}.png`} />
                                        <span className={getSpanClassName(element.potentials[0].statType)}>
                                            {element.potentials[0].statType} {element.potentials[0].value}%
                                        </span>
                                    </div>
                                    <div className="potential">
                                        <img src={`${IMG_URL_BASE}/포텐셜_${element.potentials[1].statType}.png`} />
                                        <span className={getSpanClassName(element.potentials[1].statType)}>
                                            {element.potentials[1].statType} {element.potentials[1].value}%
                                        </span>
                                    </div>
                                    <div className="potential blank"></div>
                                </div>;
                    else
                        return <div className={`potential-group ${element.type.toLowerCase()}`} draggable="true" key={getUUID()} onDragStart={grabCube} onDragEnd={(e) => e.preventDefault()}>
                                    <div className="potential">
                                        <img src={`${IMG_URL_BASE}/포텐셜_${element.potentials[0].statType}.png`} />
                                        <span className={getSpanClassName(element.potentials[0].statType)}>
                                            {element.potentials[0].statType} {element.potentials[0].value}%
                                        </span>
                                    </div>
                                    <div className="potential blank"></div>
                                    <div className="potential blank"></div>
                                    <div className="potential">
                                        <img src={`${IMG_URL_BASE}/포텐셜_${element.potentials[1].statType}.png`} />
                                        <span className={getSpanClassName(element.potentials[1].statType)}>
                                            {element.potentials[1].statType} {element.potentials[1].value}%
                                        </span>
                                    </div>
                                </div>;
                })}
            </div>
            <div className="create-potential-buttons">
                <button type="button" onClick={loadList}>10개 생성</button>
            </div>
        </div>
    );
}