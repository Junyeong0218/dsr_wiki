import React, { useMemo, useRef, useState } from "react";
import { getSearchedEvolutions } from "../../functions/searchFunctions";
import { getUUID } from "../../functions/commons";
import { getEvolutionByName, getEvolutions } from "../../functions";
import { Evolution } from "../../classes";
import { IMG_URL_BASE } from "../../enums";

type SearchBarProps = { setSelectedDigimon: React.Dispatch<React.SetStateAction<Evolution | null>> }



export default function SearchBar({ setSelectedDigimon }: SearchBarProps): React.ReactElement {
    const [isFocus, setIsFocus] = useState(false);

    const searchBar = useRef<HTMLDivElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const searchListTag = useRef<HTMLDivElement>(null);
    
    

    const moveFocusToButton = (event: React.KeyboardEvent) => {
        const key = event.keyCode;

        if(key === 40) {
            const buttons = searchListTag.current!.children;
            if(buttons.length > 0) {
                event.preventDefault();
                (buttons[0] as HTMLButtonElement).focus();
            }
        }
    }

    // const moveFocusInList = (event: React.KeyboardEvent, digimonName: string) => {
    //     event.preventDefault();
    //     const key = event.keyCode;
        
    //     if(key === 13) {
    //         selectDigimon(event, digimonName);
    //         return;
    //     }

    //     const buttons = searchListTag.current!.children;
    //     let currentIndex = -1;
    //     for(let i = 0; i < buttons.length; i++) {
    //         if(buttons[i].id === (event.target as HTMLElement).id) {
    //             currentIndex = i;
    //             break;
    //         }
    //     }

    //     if(currentIndex === -1) return;

    //     if(key === 38) {
    //         if(currentIndex === 0) {
    //             textInputRef.current!.focus();
    //         } else if(currentIndex > 0) {
    //             (buttons[currentIndex - 1] as HTMLButtonElement).focus();
    //         }
    //     } else if(key === 40 && currentIndex < buttons.length - 1) {
    //         (buttons[currentIndex + 1] as HTMLButtonElement).focus();
    //     }
    // }

    const updateFocus = (event: React.FocusEvent) => {
        if(event.type === "focus") {
            setIsFocus(true);
        } else if(event.type === "blur") {
            if(event.relatedTarget?.className !== "searched-item") {
                setIsFocus(false);
            }
        }
    }

    const moveFocusToInput = (event: React.MouseEvent) => {
        textInputRef.current!.focus();
    }

    const selectDigimon = (event: React.MouseEvent|React.KeyboardEvent, digimonName: string) => {
        const evolution = getEvolutionByName(digimonName)!;
        setIsFocus(false);
        getEvolutions(evolution);
        setSelectedDigimon(evolution);
    }

    

    // const searchList = useMemo(() => {
    //     return <div ref={searchListTag} className={`search-list ${isFocus ? "active" : ""}`}>
    //             { searched.length > 0 && searched.map(digimon => (
    //                 <button type="button" className="searched-item"
    //                         onClick={(event) => {selectDigimon(event, digimon.name)}}
    //                         onKeyDown={(event) => moveFocusInList(event, digimon.name)}
    //                         id={digimon.name}
    //                         key={getUUID()}>
    //                     <img src={`/images/${digimon.name}.png`} />
    //                     <span dangerouslySetInnerHTML={{__html: digimon.tag}}></span>
    //                 </button>
    //             ))}
    //         </div>;
    // }, [searched, text, isFocus])

    return (
        <div ref={searchBar} className="search-bar" onFocus={updateFocus} onBlur={updateFocus}>
            {/* { textInput }
            <span className={`custom-placeholder ${isFocus ? "top" : text === "" ? "" : "hide"}`}>디지몬 초성 혹은 이름을 입력하세요.</span> */}
            <button type="button" className="search-image" onClick={moveFocusToInput}>
                <img src={`${IMG_URL_BASE}/magnifying-glass.png`} />
            </button>
            {/* { searchList } */}
        </div>
    );
}