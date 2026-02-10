import axios from 'axios';
import { useState } from 'react';
import Hider from './Hider';
import bossList from './json files/bosses.json'
import styles from './CSS Modules/ListingForm.module.css'
import Player from './Player';
import encodeList from './encodeList';
import playerList from './json files/nightfarers.json'

function ListingForm() {
    const nightfarers = Object.fromEntries(playerList.nightfarers.map(char => [`char${char.id}`,false]));
    const bosses = bossList.bosses;
    const regBosses = bosses.map(boss => [`reg${boss.id}`, false]);
    const darkBosses = bosses.map(boss => {
        if (boss.dark == true) {
            return [`dark${boss.id}`, false];
        }})
        .filter(function(element) {
            return element !== undefined;
        });
        const allBosses = Object.fromEntries([...regBosses, ...darkBosses]);

    const [inputs, setInputs] = useState({
        targets: {...allBosses},
        platform: 'steam',
        username: '',
        dlc: false,
        description: '',
        instructions: '',
        numCheck: 0,
        character1:{...nightfarers},
        character2:null,
        character3:null,
        depth: false,
        numElems: Object.keys(allBosses).length
    });

    const [coop, setCoop] = useState(false);

    const handleCheck = (e) => {
        const group = e.target.dataset.group;
        const name = e.target.name;
        const value = e.target.checked;
        setInputs(values => ({...values, [group]: {...values[group], [name]: value}, numCheck: group == 'targets'? (value ? values.numCheck + 1: values.numCheck - 1) : inputs.numCheck}) )
    }
    const handleOther = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const toggleDepth = () => {
        setInputs(values => ({...values, depth: !values.depth}));
    }
    const toggleChecks = () => {
        let boolean;
        let override;
        if (inputs.numCheck == inputs.numElems) {
            boolean = false;
            override = 0;
        } else {
            boolean = true;
            override = inputs.numElems;
        }
        const tarDupe = {};
        Object.keys(inputs.targets).forEach(function(key){tarDupe[key] = boolean})
        setInputs(values => ({...values, targets: tarDupe, numCheck: override}))
    }
    const toggleCoop = () => {
        setCoop(!coop);
        setInputs(values => ({...values, character2: !coop? {...nightfarers} : null}))
    }
    const logit = () => {
        console.log(inputs);
        // console.log(coop);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = encodeList(inputs, bosses.length)
        console.log(payload)
        axios.post('/add', payload)
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='button' onClick = {logit} value='print inputs' />
            <label>Choose your Platform:</label>
            <select name="platform" onChange = {handleOther}>
                <option value="steam">Steam</option>
                <option value="xbox">Xbox</option>
                <option value="ps">Playstation</option>
            </select> <br/>
            <input type='button' onClick = {toggleDepth} value={inputs.depth ? 'Return to individual bosses' : 'Switch to Depth of Night'} />
            { inputs.depth? <h1>DEPTH OF NIGHT ACTIVE</h1> :
            <Hider className = {styles.hider}>
                <input type='button' value='Toggle All Targets' onClick = {toggleChecks} /> <br />
                <ul className = {styles.bosses}>
                    {bosses.map(boss =>
                        <li key={'reg'+boss.id}>
                            <label>
                                <input type='checkbox' name={`reg${boss.id}`} data-group='targets' checked={inputs.targets[`reg${boss.id}`]} onChange = {handleCheck} />
                                {` ${boss.name}`}
                            </label>
                        </li>
                    )}
                </ul>
                
                <ul className = {styles.bosses}>
                    {bosses.map(boss =>
                        {if(boss.dark == true) {
                            return <li key={'dark'+boss.id}>
                                <label>
                                    <input type='checkbox' name={`dark${boss.id}`} data-group='targets' checked={inputs.targets[`dark${boss.id}`]} onChange = {handleCheck} />
                                    {` Everdark ${boss.name}`}
                                </label>
                            </li>
                        }}
                    )}
                </ul>
            </Hider> 
            }
            <label>Username</label>
            <input type='text' name = 'username' onChange = {handleOther} required/> 
            <label>
                <input type='checkbox' name='dlc' checked={inputs.dlc} onChange = {handleOther} />
                Require DLC?
            </label><br />
            <label>Description</label>
            <textarea name = 'description' rows = '5' cols = '75' onChange = {handleOther}/> <br />
            <label>Join Instructions (only visible after accepting someone)</label>
            <textarea name = 'instructions' rows = '5' cols = '75' onChange = {handleOther}/> <br />

            <Player number='1' onChange = {handleCheck} group = 'character1' checked = {inputs.character1}/>
            { coop ? 
                <Player number='2' onChange = {handleCheck} group = 'character2' checked = {inputs.character2}>
                    <input type='button' value='Remove second party member' onClick = {toggleCoop}/>
                 </Player> :
                <input type='button' value = 'Add a second party member' onClick = {toggleCoop}/>
            }
            <input type='submit' value='Create listing' />
        </form>
    )
}

export default ListingForm;