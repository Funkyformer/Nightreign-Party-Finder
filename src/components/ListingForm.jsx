import { useState } from 'react';
import Hider from './Hider';

function ListingForm() {

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <form>
            <Hider>
                <div className = 'regBossChecks'>
                    <label>
                        <input type="checkbox" name="boss01" value = {inputs.boss01} onChange = {handleChange} /> Tricephalos
                    </label>
                    <label>
                        <input type="checkbox" name='boss02' value = {inputs.boss02} onChange = {handleChange}/> Gaping Jaw
                    </label>
                    <label>
                        <input type="checkbox" name='boss03' value = {inputs.boss03} onChange = {handleChange}/> Sentient Pest
                    </label>
                    <label>
                        <input type="checkbox" name='boss04' value = {inputs.boss04} onChange = {handleChange}/> Augur
                    </label>
                    <label>
                        <input type="checkbox" name='boss05' value = {inputs.boss05} onChange = {handleChange}/> Equilibrious Beast
                    </label>
                    <label>
                        <input type="checkbox" name='boss06' value = {inputs.boss06} onChange = {handleChange}/> Darkdrift Knight
                    </label>
                    <label>
                        <input type="checkbox" name='boss07' value = {inputs.boss07} onChange = {handleChange}/> Fissure in the Fog
                    </label>
                    <label>
                        <input type="checkbox" name='boss08' value = {inputs.boss08} onChange = {handleChange}/> Night Aspect
                    </label>
                    <label>
                        <input type="checkbox" name='boss09' value = {inputs.boss09} onChange = {handleChange}/> Balancers
                    </label>
                    <label>
                        <input type="checkbox" name='boss10' value = {inputs.boss10} onChange = {handleChange}/> Dreglord
                    </label>
                </div>
                <div className = 'darkBossChecks'>
                    <label>
                        <input type="checkbox" name="boss01" value = {inputs.boss01} onChange = {handleChange} /> Tricephalos
                    </label>
                    <label>
                        <input type="checkbox" name='boss02' value = {inputs.boss02} onChange = {handleChange}/> Gaping Jaw
                    </label>
                    <label>
                        <input type="checkbox" name='boss03' value = {inputs.boss03} onChange = {handleChange}/> Sentient Pest
                    </label>
                    <label>
                        <input type="checkbox" name='boss04' value = {inputs.boss04} onChange = {handleChange}/> Augur
                    </label>
                    <label>
                        <input type="checkbox" name='boss05' value = {inputs.boss05} onChange = {handleChange}/> Equilibrious Beast
                    </label>
                    <label>
                        <input type="checkbox" name='boss06' value = {inputs.boss06} onChange = {handleChange}/> Darkdrift Knight
                    </label>
                    <label>
                        <input type="checkbox" name='boss07' value = {inputs.boss07} onChange = {handleChange}/> Fissure in the Fog
                    </label>
                    <label>
                        <input type="checkbox" name='boss08' value = {inputs.boss08} onChange = {handleChange}/> Night Aspect
                    </label>
                    {/* <label>
                        <input type="checkbox" name='boss09' value = {inputs.boss09} onChange = {handleChange}/> Balancers
                    </label>
                    <label>
                        <input type="checkbox" name='boss10' value = {inputs.boss10} onChange = {handleChange}/> Dreglord
                    </label> */}
                </div>
            </Hider>
        </form>
    )
}

export default ListingForm;