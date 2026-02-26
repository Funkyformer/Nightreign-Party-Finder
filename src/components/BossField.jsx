// used by FilterForm for displaying all boss toggles

import {Tooltip} from 'react-tooltip';

function BossField({mode, state, onClick, bosses, className}) {
    const parseState = (id) => {
        switch(state[`${mode}${id}`]) {
            case 0:
                return ` - ignored`
            case 1:
                return ` - required`
            case 2:
                return ` - blacklisted`

    }}

    return (
        <div className = {className}>
            <Tooltip id="tooltip" />
            { bosses.map(boss => {return (mode == 'dark' && !boss.dark) ? 
                <div key={boss.id}/> : 
                <img name={`${mode}${boss.id}`} src = {state[`${mode}${boss.id}`]==2 ? `/images/bosses/down/${mode}${boss.id}.webp` :
                `/images/bosses/${mode}${boss.id}.webp`} alt={boss.title} data-tooltip-id='tooltip'
                data-tooltip-content={`${boss.title}${parseState(boss.id)}`} key={boss.id}
                style={state[`${mode}${boss.id}`] == 0 ? {opacity: 0.3} : {}} onClick = {onClick}/>
            }
            ) }
        </div>
    )
}

export default BossField;