import React from "react";
import { getUUID } from "../../functions/commons";
import { Skill } from "../../classes";

type DigimonSkillTableProps = { skill: Skill }

export default function DigimonSkillTable({ skill }: DigimonSkillTableProps): React.ReactElement {
    return (
        <table>
            <thead>
                <tr>
                    <td>1레벨</td>
                    <td>2레벨</td>
                    <td>3레벨</td>
                    <td>4레벨</td>
                    <td>5레벨</td>
                    <td>6레벨</td>
                    <td>7레벨</td>
                    <td>8레벨</td>
                    <td>9레벨</td>
                    <td>10레벨</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    { skill.coefficients.map((co, index) => (
                        <td key={getUUID()}>{skill.getPercentByIndex(index)}%</td>
                    )) }
                </tr>
            </tbody>
        </table>
    );
}