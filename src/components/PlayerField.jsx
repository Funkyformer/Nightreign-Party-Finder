import playerList from './json files/nightfarers.json'

function PlayerField({onClick, className, inputs, group}) {
    const nightfarers = playerList.nightfarers;

    return (
    <div className = {className}>
        { nightfarers.map(char =>
            <img name={`char${char.id}`} group={group} src = {`/images/nightfarers/char${char.id}.webp`} alt={char.id} style={inputs[`char${char.id}`] ? {} : {opacity: 0.6}}
            key={`${group}-${char.id}`} onClick = {onClick}/>
        ) }
    </div>)
}

export default PlayerField