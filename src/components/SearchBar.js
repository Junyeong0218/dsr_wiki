import React, { useMemo, useRef, useState } from "react";
import { getSearchedDigimons } from "../functions/searchFunctions";
import { getDigimonByName } from "../functions/getDigimonFunctions";
import getRevolutions from "../functions/getRevolutions";
import { getUUID } from "../functions/commons";

export default function SearchBar({ setSelectedDigimon }) {
    const [text, setText] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [searched, setSearched] = useState([]);

    const searchBar = useRef();
    const textInputRef = useRef();
    const searchListTag = useRef();
    
    const updateText = (event) => {
        if(event.target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = event.target.value.trim();

            if(typed === "") {
                setText(typed);
            } else if(!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = getSearchedDigimons(event.target.value.trim());
                setSearched(searched);
            }
        }
    }

    const moveFocusToButton = (event) => {
        const key = event.keyCode;

        if(key === 40) {
            const buttons = searchListTag.current.children;
            if(buttons.length > 0) {
                event.preventDefault();
                buttons[0].focus();
            }
        }
    }

    const moveFocusInList = (event, digimonName) => {
        event.preventDefault();
        const key = event.keyCode;
        
        if(key === 13) {
            selectDigimon(event, digimonName);
            return;
        }

        const buttons = searchListTag.current.children;
        let currentIndex = -1;
        for(let i = 0; i < buttons.length; i++) {
            if(buttons[i].id === event.target.id) {
                currentIndex = i;
                break;
            }
        }

        if(currentIndex === -1) return;

        if(key === 38) {
            if(currentIndex === 0) {
                textInputRef.current.focus();
            } else if(currentIndex > 0) {
                buttons[currentIndex - 1].focus();
            }
        } else if(key === 40 && currentIndex < buttons.length - 1) {
            buttons[currentIndex + 1].focus();
        }
    }

    const updateFocus = (event) => {
        if(event.type === "focus") {
            setIsFocus(true);
        } else if(event.type === "blur") {
            if(event.relatedTarget?.className !== "searched-item") {
                setIsFocus(false);
            }
        }
    }

    const moveFocusToInput = (event) => {
        textInputRef.current.focus();
    }

    const selectDigimon = (event, digimonName) => {
        const digimon = getDigimonByName(digimonName);
        setIsFocus(false);
        getRevolutions(digimon);
        setSelectedDigimon(digimon);
    }

    const textInput = useMemo(() => {
        return <input ref={textInputRef} type="text" value={text} onChange={updateText} onKeyDown={moveFocusToButton} />;
    }, [text]);

    const searchList = useMemo(() => {
        return <div ref={searchListTag} className={`search-list ${isFocus ? "active" : ""}`}>
                { searched.length > 0 && searched.map(digimon => (
                    <button type="button" className="searched-item"
                            onClick={(event) => {selectDigimon(event, digimon.name)}}
                            onKeyDown={(event) => moveFocusInList(event, digimon.name)}
                            id={digimon.name}
                            key={getUUID()}>
                        <img src={`/images/${digimon.name}.png`} />
                        <span dangerouslySetInnerHTML={{__html: digimon.tag}}></span>
                    </button>
                ))}
            </div>;
    }, [searched, text, isFocus])

    return (
        <div ref={searchBar} className="search-bar" onFocus={updateFocus} onBlur={updateFocus}>
            { textInput }
            <span className={`custom-placeholder ${isFocus ? "top" : text === "" ? "" : "hide"}`}>디지몬 초성 혹은 이름을 입력하세요.</span>
            <button type="button" className="search-image" onClick={moveFocusToInput}>
                <img src="/images/magnifying-glass.png" />
            </button>
            { searchList }
        </div>
    );
}