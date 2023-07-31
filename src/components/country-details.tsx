import { useEffect, useState } from "react";
import Header from "./header";
import { useLocation, useNavigate } from "react-router-dom";

function Country_details() {
    const [mode, setMode] = useState('light')
    const [country, setcountry] = useState<any>({})
    const location = useLocation();
    let navigate = useNavigate();
    var c = 0;

    useEffect(() => {
        if (location.state) {
            fetch("https://restcountries.com/v3.1/name/" + location.state.name + "?fullText=true")
                .then((res) => {
                    if (res.status == 200) {
                        res.json()
                            .then(json => {
                                setcountry(json);
                                console.log(json[0]);

                                console.log(json[0]['maps']['googleMaps']);
                                // // console.log(json[0]['name']['nativeName']);
                                // console.log('cap ' + json[0]['capital'][0]);
                                // console.log('ppltn ' + json[0]['population']);
                                // console.log('tld ' + json[0]['tld'][0]);
                                // console.log('region ' + json[0]['region']);
                                // console.log('subregion  ' + json[0]['subregion']);
                                // // console.log('curr ' + json[0]['currencies']);

                                // if (json[0]['borders']) {
                                //     Object.keys(json[0]['borders']).map(key => {
                                //         console.log('borders ' + json[0]['borders'][key])
                                //     })
                                // } else {
                                //     console.log('no borders')
                                // }

                                // Object.keys(json[0]['name']['nativeName']).map(key => {
                                //     console.log('name ' + json[0]['name']['nativeName'][key]['common'])
                                // })
                                // Object.keys(json[0]['currencies']).map(key => {
                                //     console.log('currencies ' + json[0]['currencies'][key]['name'])
                                // })
                                // Object.keys(json[0]['languages']).map(key => {
                                //     console.log('lang ' + json[0]['languages'][key])
                                // })
                            })
                    }
                })
        } else {
            navigate('/')
        }


        !localStorage.getItem('mode') && localStorage.setItem('mode', 'light');
        setMode(localStorage.getItem('mode') as string)
        const handleStorage = () => {
            setMode(localStorage.getItem('mode') as string)
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])


    return (
        <>
            <Header mode={mode} />
            {
                country != undefined &&
                Object.keys(country).map(key => {
                    return (
                        <div className={`cd-details ${mode}-body`} key={0}>
                            <div className="cd-child">
                                <button className={mode} onClick={() => { navigate('/') }}>
                                    <i className="fa-solid fa-arrow-left"></i> &nbsp;
                                    back
                                </button>
                            </div>
                            <div className="cd-child">
                                <div className="div-flag">
                                    <img src={country[0]['flags']['svg']} alt={country[0]['flags']['alt']} />
                                </div>
                                <div className={`info ${mode}-body`}>
                                    <div className="info-child">
                                        <h1>{country[key]['name']['common']}</h1>
                                        <div className="info-gchild">
                                            <div><label>Native name: </label>
                                                <span>
                                                    {
                                                        Object.keys(country[0]['name']['nativeName']).map(key => {
                                                            if (c == 0) {
                                                                c++;
                                                                return (country[0]['name']['nativeName'][key]['common'])
                                                            }
                                                        })
                                                    }
                                                </span>
                                            </div>
                                            <div><label>Population: </label><span>{country[key]['population'].toLocaleString()}</span></div>
                                            <div><label>Region: </label><span>{country[key]['region']}</span></div>
                                            <div><label>Sub Region: </label><span>{country[key]['subregion']}</span></div>
                                            <div><label>Capital: </label><span>{country[key]['capital']}</span></div>
                                        </div>
                                        <div className="info-gchild">
                                            <div><label>Top level domain: </label><span>{country[key]['tld']}</span></div>
                                            <div><label>Currencies: </label>
                                                <span>
                                                    {
                                                        Object.keys(country[0]['currencies']).map(key => {
                                                            return (country[0]['currencies'][key]['name'])
                                                        })
                                                    }
                                                </span>
                                            </div>
                                            <div><label>languages: </label>
                                                <span>
                                                    {
                                                        Object.keys(country[0]['languages']).map(key => {
                                                            return (country[0]['languages'][key] + ' ')
                                                        })
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <a className={`g-location ${mode}-body`} href={country[0]['maps']['googleMaps']} target="_blank">
                                                    <label>Google Map </label><i className="fa-solid fa-location-dot"></i>
                                                </a>
                                            </div>
                                            <div><label>Time zones: </label>
                                                <span>
                                                    {
                                                        Object.keys(country[0]['timezones']).map(key => {
                                                            return (country[0]['timezones'][key] + ' ')
                                                        })
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-child">
                                        <label>Boundaries:</label>
                                        <div>
                                            {
                                                country[0]['borders'] != undefined ?
                                                    Object.keys(country[0]['borders']).map(key => {
                                                        return (<span key={country[0]['borders'][key]} className={`${mode}`}>{country[0]['borders'][key]}</span>)
                                                    })
                                                    :
                                                    'None'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </>
    )
}

export default Country_details
