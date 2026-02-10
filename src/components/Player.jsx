import playerList from './json files/nightfarers.json'

function Player(props) {
    const nightfarers = playerList.nightfarers;

    return (
        <div>
            <ul >
                {nightfarers.map(char =>
                    <li key={'char'+char.id}>
                        <label>
                            <input type='checkbox' name={`char${char.id}`} data-group={props.group} checked={props.checked[`char${char.id}`]} onChange = {props.onChange} />
                            {` ${char.name}`}
                        </label>
                    </li>
                )}
            </ul>

            {props.children}
        </div>
    )
}

export default Player