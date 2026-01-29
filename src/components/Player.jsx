import playerList from './nightfarers.json'

function Player(props) {
    const nightfarers = playerList.nightfarers;

    return (
        <div>
            <label>Select a Character: 
                <select name = {`character${props.number}`} onChange = {props.onChange}>
                    {nightfarers.map(char => 
                        <option key = {`char${props.number}${char.name}`} value={char.name}>{char.name}</option>
                    )}
                </select>
            </label>
            {props.children}
        </div>
    )
}

export default Player