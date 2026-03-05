import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Tooltip} from 'react-tooltip';
import bossList from './json files/bosses.json'
import styles from './CSS Modules/ListingForm.module.css'
import Player from './PlayerField';
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
        platform: 0,
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

    const navigate = useNavigate();

    const handleBoss = (e) => {
        const name = e.target.name;
        const val = !inputs.targets[name];
        setInputs(values => ({...values, targets: {...values.targets, [name]: val}, numCheck: val ? inputs.numCheck + 1 : inputs.numCheck - 1 }) )
    }
    const handlePlayer = (e) => {
        const name = e.target.name;
        const group = e.target.getAttribute("group");
        const val = !inputs[group][name];
        setInputs(values => ({...values, [group]: {...values[group], [name]: val}}))
    }
    const handleOther = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const toggleDepth = () => {
        if (inputs.depth) {
            setInputs(values => ({...values, depth:false, targets: {...allBosses}}));
        }
        else {
            setInputs(values => ({...values, depth:true, targets: 1, numCheck: 0}));
        }
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
        // console.log(payload)
        axios.post('/add', payload)
        .then(function(response) {
            console.log(response);
            navigate(`/view/${response.data.listingID}`);
        })
        .catch((e) => console.log(e));
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={`${styles.halfHolder} ${styles.cell} ${styles.cellLeft}`}>
                <input type='button' onClick = {toggleDepth} value={inputs.depth ? 'Return to individual bosses' : 'Switch to Depth of Night'} />
                { inputs.depth ? 
                    <div>
                        <h1>DEPTH OF NIGHT ACTIVE</h1>
                        <input type='range' name='targets' min='1' max='5' value={inputs.targets} onChange={handleOther}/>
                        <label>Depth {inputs.targets}</label>
                    </div> :
                    <div>
                        <input type='button' value='Toggle All Targets' onClick = {toggleChecks} />
                        <div className = {styles.bossGrid}>
                            { bosses.map(boss => 
                                <img name={`reg${boss.id}`} src = {inputs.targets[`reg${boss.id}`] ? `/images/bosses/reg${boss.id}.webp` :
                                `/images/bosses/down/reg${boss.id}.webp`} alt={boss.title} data-tooltip-id='tooltip' style={inputs.targets[`reg${boss.id}`] ? {} : {opacity: 0.6}}
                                data-tooltip-content={`${boss.title}`} key={`reg${boss.id}`} onClick = {handleBoss}/>
                            ) }
                        </div>
                        <div className = {styles.bossGrid}>
                            { bosses.map(boss => boss.dark ?
                                <img name={`dark${boss.id}`} src = {inputs.targets[`dark${boss.id}`] ? `/images/bosses/dark${boss.id}.webp` :
                                `/images/bosses/down/dark${boss.id}.webp`} alt={boss.title} data-tooltip-id='tooltip' style={inputs.targets[`dark${boss.id}`] ? {} : {opacity: 0.6}}
                                data-tooltip-content={`${boss.title}`} key={`dark${boss.id}`} onClick = {handleBoss}/> :  <br key={`dark${boss.id}`}/>
                            ) }
                        </div>
                    </div> }
            </div>
            <div className={`${styles.halfHolder} ${styles.duoGrid}`}>
                <div className={styles.cell}>
                    <Player onClick = {handlePlayer} group = 'character1' className = {styles.bossGrid} inputs={inputs.character1}/>
                </div>
                <div className={styles.cell}>
                { coop ?  
                    <div>
                        <Player onClick = {handlePlayer} group = 'character2' className = {styles.bossGrid} inputs={inputs.character2}/>
                        <input type='button' value = 'Remove Party Member' onClick = {toggleCoop}/>
                    </div>:
                    <input type='button' value = 'Add a second party member' onClick = {toggleCoop}/>
                }</div>
            </div>
            <div className={`${styles.cell} ${styles.cellLeft}`}>
                <div>
                    <label>Platform</label>
                    <select name="platform" onChange = {handleOther}>
                        <option value={0}>Steam</option>
                        <option value={1}>Xbox</option>
                        <option value={2}>Playstation</option>
                    </select>
                </div>
                <div>
                    <label>Username</label>
                    <input type='text' name = 'username' onChange = {handleOther} required/>
                </div>
                <div>
                    <input type='checkbox' name='dlc' checked={inputs.dlc} onChange = {handleOther} />
                    <label>Require DLC?</label>
                </div>
                <input type='button' onClick = {logit} value='print inputs' />
            </div>
            <div className={`${styles.thirdHolder} ${styles.cell}`}>
                <label>Description</label>
                <textarea name = 'description' className={styles.textarea} onChange = {handleOther}/>
            </div>
            <div className={`${styles.thirdHolder} ${styles.cell}`}>
                <label>Join Instructions (only visible after accepting someone)</label>
                <textarea name = 'instructions' className={styles.textarea} onChange = {handleOther}/>
            </div>
            <div className={styles.cell}>
                <input type='submit' value='Create listing' />
            </div>
            <Tooltip id="tooltip"/>
        </form>
    )
}

export default ListingForm;