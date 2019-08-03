import React from 'react'
import '../../css/experiences/languageFilter.css'

function LanguageFilter({getLanguagesVisible, languages, setLanguages, languageClick, setLanguageClick} : {getLanguagesVisible:any, languages:any, setLanguages:any, languageClick:any, setLanguageClick:any}) {

    const langList = ["English", "German", "Italian", "Bahasa", "Japanese", "Korean", "Chinese", "Spanish"]

    function onClick(e) {
        if(e.target.checked){
            if(JSON.stringify(languages) === JSON.stringify(langList)) {
                var temp = []
                temp.push(e.target.value)
                setLanguages(temp)
            } else {
                let temp:any[] = languages
                temp.push(e.target.value)
                setLanguages(temp)
            }
        } else {
            let temp:any[] = languages
            let index = temp.indexOf(e.target.value)
            if(index > -1){
                temp.splice(index, 1)
                if(temp.length === 0) temp = langList
                setLanguages(temp)
            }
        }
    }

    return (
        <div className="filter" style={getLanguagesVisible()}>
            <div className="gridContainer">
                <label className="container">English
                    <input type="checkbox" onClick={onClick} value="English"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Bahasa
                    <input type="checkbox" onClick={onClick} value="Bahasa"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Japanese
                    <input type="checkbox" onClick={onClick} value="Japanese"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">German
                    <input type="checkbox" onClick={onClick} value="German"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Italian
                    <input type="checkbox" onClick={onClick} value="Italian"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Korean
                    <input type="checkbox" onClick={onClick} value="Korean"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Chinese
                    <input type="checkbox" onClick={onClick} value="Chinese"/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Spanish
                    <input type="checkbox" onClick={onClick} value="Spanish"/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <span className="apply" onClick={() => setLanguageClick(!languageClick)}>Apply</span>
        </div>
    )
}

export default LanguageFilter
