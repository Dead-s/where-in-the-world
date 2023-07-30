function setMode() {
    if (localStorage.getItem('mode') === 'dark') {
        localStorage.setItem('mode', 'light');
    } else {
        localStorage.setItem('mode', 'dark');
    }
    window.dispatchEvent(new Event('storage'))
}

function Header(props: { mode: string }) {
    return (
        < div className={`header ${props.mode}`} >
            <label>Where in the world?</label>
            <label id="mode-toggle">
                <span><i className={props.mode == 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i> </span>
                <span onClick={setMode}>{props.mode == 'light' ? 'Dark' : 'Light'} Mode</span>
            </label>
        </ div>
    )

}

export default Header;