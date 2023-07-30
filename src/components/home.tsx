import { useEffect, useState } from 'react'
import Country_card from './country-card'
import Header from './header'
import FilternSeacrh from './filterNsearch'

function Home() {
    const [mode, setMode] = useState('light')
    const [country, setCountry] = useState<any>({})

    useEffect(() => {
        fetch(
            "https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((json) => {
                // console.log(json[0])
                // console.log(json[0]['flags']['svg'])
                // console.log(json[0]['region'])
                // console.log(json[0]['name']['common'])
                // console.log(json[0]['population'])
                // console.log(json[0]['capital'])
                // Object.keys(json).map(key => {
                // })
                setCountry(json)
            }).catch(error => {
                console.log('error : ' + error)
            });

        !localStorage.getItem('mode') && localStorage.setItem('mode', 'light');
        setMode(localStorage.getItem('mode') as string)
        const handleStorage = () => {
            setMode(localStorage.getItem('mode') as string)
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    document.body.className = mode + '-body';
    return (
        <>
            <Header mode={mode} />
            <div className='body'>
                <FilternSeacrh mode={mode} setCountry={setCountry} />
                <div className="body-child2">
                    {
                        Object.keys(country).map(key => {
                            return (
                                <Country_card mode={mode} key={key}
                                    name={country[key]['name']['common']}
                                    region={country[key]['region']}
                                    capital={country[key]['capital']}
                                    pltn={country[key]['population']}
                                    flag={country[key]['flags']['svg']}
                                />
                            );
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Home
