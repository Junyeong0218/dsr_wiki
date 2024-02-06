import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Guide = {
    id: number,
    title: string,
    description: string
}

export default function Guide(): React.ReactElement {
    const navigate = useNavigate();

    const { id } = useParams();
    if(isNaN(Number(id))) {
        alert("게시글이 없습니다.\n다시 시도해 주세요.");
        navigate("/guides");
    }

    const [guide, setGuide] = useState<Guide>();

    const loadGuide = async () => {
        const response = await fetch(`/.netlify/functions/getGuide?id=${id}`);
        const result: Guide = await response.json();

        setGuide(result);
    }

    useEffect(() => {
        loadGuide();
    }, []);

    return (
        <div className="main">
            { guide &&
                <div className="guide-container">
                    <div className="guide-title-container">
                        <span>{ guide.title }</span>
                        <div className="buttons">
                            <button type="button" onClick={() => navigate("/guides")}>목록으로</button>
                        </div>
                    </div>
                    <div className="guide-description" dangerouslySetInnerHTML={{__html: guide.description}}></div>
                </div>
            }
        </div>
    );
}