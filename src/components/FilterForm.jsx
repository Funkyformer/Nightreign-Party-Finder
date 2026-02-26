import BossField from './BossField';
import styles from './CSS Modules/FilterForm.module.css';

function FilterForm({onSubmit, inputs, setInputs, bosses, allBosses, setQuery}) {

    const resetInputs = () => {
        setInputs({
            targets:{...allBosses},
            platform:0,
            dlc: false,
            twoPlayers: false,
            depth: 1,
            useBosses: false,
            useDepth: false
        });
        setQuery('');
    }

    const toggler = (e) => {
        const name = e.target.name;
        setInputs(values => ({...values, [name]: !inputs[name]}));
    }

    const handleBosses = (e) => {
        const name = e.target.name;
        const value = (inputs.targets[name] + 1) % 3;
        setInputs(values => ({...values, targets: {...inputs.targets, [name]: value}}));
    }
    const handleDepth = () => {
        setInputs(values => ({...values, depth: (inputs.depth) % 5+1}))
    }
    const handlePlat = () => {
        setInputs(values => ({...values, platform: (inputs.platform + 1) % 3}));
    }

    const bossReset = () => {
        setInputs(values => ({...values, targets: {...allBosses}}))
    }

    return (
        <form onSubmit={onSubmit}>
            <input type='button' value = 'print inputs' onClick={() => console.log(inputs)} />
            <input type='button' value = 'Reset Filters' onClick={resetInputs} />
            <input type='submit' value = 'Apply Filters' />
            <div className={styles.container}>
                <div className = {`${styles.halfHolder} ${styles.left}`}>
                    { inputs.useBosses ? 
                    <div className={styles.subHolder}>
                        <div>
                        <BossField bosses={bosses} state={inputs.targets} mode='reg' className = {styles.bossField} onClick = {handleBosses}/>
                        <BossField bosses={bosses} state={inputs.targets} mode='dark' className = {styles.bossField} onClick = {handleBosses}/>
                        </div>
                        <div>
                        <input type='button' name='useBosses' value = 'Remove Boss Filter' onClick={toggler} />
                        <input type='button' name='useBosses' value = 'Reset Bosses' onClick={bossReset} />
                        </div>
                    </div> : 
                    <div className={styles.subHolder}>
                        <input type='button' name='useBosses' value = 'Add Boss Filter' onClick={toggler} />
                    </div> }
                </div>
                <div className={styles.halfHolder}>
                    { inputs.useDepth ?
                    <div className={styles.subHolder}>
                        <img src={`/public/images/depths/depth${inputs.depth}.webp`} alt = 'depth' onClick={handleDepth}/>
                        <input type='button' name='useDepth' value = 'Remove Depth Filter' onClick={toggler} />
                    </div> :
                    <div className={styles.subHolder}>
                        <input type='button' name='useDepth' value = 'Add Depth Filter' onClick={toggler} />
                    </div> }
                </div>
                <div className={`${styles.thirdHolder} ${styles.left}`}>
                    <input type='button' name='platform' value = {`platform: ${inputs.platform}`} onClick={handlePlat} />
                </div> 
                <div className={styles.thirdHolder}>
                    <input type='button' name='dlc' value = {`require dlc: ${inputs.dlc}`} onClick={toggler} />
                </div> 
                <div className={styles.thirdHolder}>
                    <input type='button' name='twoPlayers' value = {`require two slots: ${inputs.twoPlayers}`} onClick={toggler} />
                </div> 
            </div>
        </form>)
}
export default FilterForm;