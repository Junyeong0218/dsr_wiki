import React from "react";
import { getCommaString } from "../../functions/commons";

export default function DigimonStatusTable({ digimon }) {
    return (
        <table>
            <thead>
                <tr>
                    <td>HP</td>
                    <td>SP</td>
                    <td>힘</td>
                    <td>지능</td>
                    <td>속도</td>
                    <td>수비</td>
                    <td>저항</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{getCommaString(digimon.hp)}</td>
                    <td>{getCommaString(digimon.sp)}</td>
                    <td>{getCommaString(digimon.str)}</td>
                    <td>{getCommaString(digimon.int)}</td>
                    <td>{getCommaString(digimon.spd)}</td>
                    <td>{getCommaString(digimon.def)}</td>
                    <td>{getCommaString(digimon.res)}</td>
                </tr>
            </tbody>
        </table>
    );
}