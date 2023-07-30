import { useState } from "react";

function FilternSeacrh(props: { mode: string, setCountry: any }) {
    const [toggle, filter_toggle] = useState(false)
    const [filtername, setFiltername] = useState('')

    function fetch_api(e: string, type: string) {
        var url = '';
        if (type === 'search') {
            url = e != '' ?
                "https://restcountries.com/v3.1/name/" + e.trim() + "?fullText=true"
                :
                "https://restcountries.com/v3.1/all";
        }
        if (type === 'filter') {
            url = "https://restcountries.com/v3.1/region/" + e.trim()
        }
        // if (type !== 'search' || ' filter') {
        //     console.log('none')
        //     url =
        //         "https://restcountries.com/v3.1/all";
        // }
        fetch(url)
            .then((res) => {
                if (res.status == 200) {
                    res.json()
                        .then(json => {
                            props.setCountry(json)
                        })
                } if (res.status == 404) {
                    fetch("https://restcountries.com/v3.1/name/" + e.trim())
                        .then((res) => {
                            if (res.status == 200) {
                                res.json()
                                    .then(json => {
                                        props.setCountry(json)
                                    })
                            } else {

                            }
                        })
                }
            })
            .catch(error => {
                console.log('error : ' + error)
            })
    }
    return (
        <div className={`body-child ${props.mode}-body`}>
            <label>
                <i className={`fa-solid fa-magnifying-glass ${props.mode}`}></i>
                <input type='search' placeholder='Search for a country...' onInput={(e) => { fetch_api((e.target as HTMLInputElement).value, 'search'); setFiltername('') }} className={props.mode} />
            </label>
            <label className={props.mode} onClick={() => { filter_toggle(toggle => !toggle) }}>{filtername == '' ? 'Filter by Region' : filtername}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i className={toggle ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}></i>
            </label>
            <ul className={toggle ? `filter-list ${props.mode}` : `filter-list-hide ${props.mode}`}>
                <li onClick={() => { fetch_api('africa', 'filter'); filter_toggle(false); setFiltername('Africa') }}>Africa</li>
                <li onClick={() => { fetch_api('america', 'filter'); filter_toggle(false); setFiltername('America') }}>America</li>
                <li onClick={() => { fetch_api('asia', 'filter'); filter_toggle(false); setFiltername('Asia') }}>Asia</li>
                <li onClick={() => { fetch_api('europe', 'filter'); filter_toggle(false); setFiltername('Europe') }}>Europe</li>
                <li onClick={() => { fetch_api('oceania', 'filter'); filter_toggle(false); setFiltername('Ocenia') }}>Oceania</li>
            </ul>
        </div >
    )
}

export default FilternSeacrh;
