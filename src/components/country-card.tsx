import { useNavigate } from "react-router-dom";

function Country_card(props: { mode: string, name: string, pltn: number, region: string, capital: string, flag: string }) {
    let navigate = useNavigate();
    return (
        <div className={`country-card ${props.mode}`} onClick={() => navigate('about_country', {
            state: { name: props.name }
        })} >
            <img src={props.flag} />

            <div className="details">
                <h3>{props.name}</h3>
                <div className="details-child">
                    <div>
                        <label>Population: </label><span>{props.pltn}</span>
                    </div>
                    <div>
                        <label>Region: </label><span>{props.region}</span>
                    </div>
                    <div>
                        <label>Capital: </label><span>{props.capital}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country_card;
