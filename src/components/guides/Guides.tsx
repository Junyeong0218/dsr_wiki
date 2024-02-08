import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../../NotFound";
import { getUUID } from "../../functions/commons";

type Guide = {
    id: number,
    title: string,
    description: string
}

export default function Guides(): React.ReactElement {
    const [list, setList] = useState<Array<Guide>>([]);

    const navigate = useNavigate();

    const loadList = async () => {
        const response = await fetch('/.netlify/functions/getGuides');
        const result: Array<Guide> = await response.json();

        setList(result.sort((a, b) => b.id - a.id));
    }

    useEffect(() => {
        loadList();
    }, []);

    return (
        <div className="main">
            <table className="guides">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>제목</td>
                    </tr>
                </thead>
                <tbody>
                { list.map(shortcut => (
                    <tr onClick={() => navigate(`/guides/${shortcut.id}`)} key={getUUID()}>
                        <td>{ shortcut.id }</td>
                        <td>{ shortcut.title }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}