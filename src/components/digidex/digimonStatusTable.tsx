import React from "react";
import { getCommaString } from "../../functions/commons";
import { Digimon } from "../../classes";

type DigimonStatusTableProps = { digimon: Digimon }

export default function DigimonStatusTable({ digimon }: DigimonStatusTableProps): React.ReactElement {
    return (
        <table>
            <thead>
                <tr>
                    <td>HP</td>
                    <td>SP</td>
                    <td>힘</td>
                    <td>지능</td>
                    <td>수비</td>
                    <td>저항</td>
                    <td>속도</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{getCommaString(digimon.hp)}</td>
                    <td>{getCommaString(digimon.sp)}</td>
                    <td>{getCommaString(digimon.str)}</td>
                    <td>{getCommaString(digimon.int)}</td>
                    <td>{getCommaString(digimon.def)}</td>
                    <td>{getCommaString(digimon.res)}</td>
                    <td>{getCommaString(digimon.spd)}</td>
                </tr>
            </tbody>
        </table>
    );
}