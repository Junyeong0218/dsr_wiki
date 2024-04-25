import React from "react";
import { Digimon } from "../../classes";

type DigimonEvaluationProps = {
    digimon: Digimon
}

export default function DigimonEvaluation({ digimon }: DigimonEvaluationProps): React.ReactElement {
    const getScoreAverageAndCount = (): Array<string> => {
        return [];
    }

    return (
        <div className="digimon-evaluation-wrapper">
            <span className="title">* 디지몬 평가</span>
            <div className="evaluation-form">
                {/* 평균 */}

                {/* 실제 등록폼 */}
                    {/* 별점 */}
                    {/* 간단한 평론? */}

                {/* 등록버튼 */}
            </div>
            <div className="evaluations">
                {/* 등록된 평가 조회 페이지당 10개 */}
            </div>
            <div className="evaluation-pagination">
                {/* 페이지네이션 */}
            </div>
        </div>
    )
}