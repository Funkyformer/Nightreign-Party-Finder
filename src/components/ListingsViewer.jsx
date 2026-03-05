import axios from "axios";
import decodeList from "./decodeList";
import { useState, useEffect } from 'react';
import Listing from "./Listing";
import styles from "./CSS Modules/ListingsViewer.module.css"
import Hider from "./Hider";
import FilterForm from "./FilterForm";
import bossList from './json files/bosses.json';
function ListingsViewer() {

    const bosses = bossList.bosses;
    const regBosses = bosses.map(boss => [`reg${boss.id}`, 0]);
    const darkBosses = bosses.map(boss => {
        if (boss.dark == true) {
            return [`dark${boss.id}`, 0];
        }})
        .filter(function(element) {
            return element !== undefined;
        });
    const allBosses = Object.fromEntries([...regBosses, ...darkBosses]);

    const [list, setList] = useState([]);
    const [query, setQuery] = useState('');

    const [inputs, setInputs] = useState({
        targets:{...allBosses},
        platform:0,
        dlc: false,
        twoPlayers: false,
        depth: 1,
        useBosses: false,
        useDepth: false
    })

    const processTargets = (tar) => {
        let wl = '';
        let bl = '';
        for (let i = 0; i < bosses.length; i++) {
            let wval = 0;
            let bval = 0;
            if (tar[`reg${i}`]==1) wval +=1;
            if (tar[`dark${i}`]==1) wval +=2;
            if (tar[`reg${i}`]==2) bval +=1;
            if (tar[`dark${i}`]==2) bval +=2;
            wl = wl.concat(procVal(wval));
            bl = bl.concat(procVal(bval));
        }
        return [wl, bl]
    }

    const procVal = (val) => {
        switch (val) {
            case 0:
                return '.';
            case 1:
                return '[13]';
            case 2:
                return '[23]';
            case 3:
                return '3';
        }
    }

    useEffect(() => {
        const getListings = async (args) => {
            await axios.get(`/listings${args}`)
            .then(res => {
                console.log(res);
                setList(res.data.map(listing => decodeList(listing)));
            })
            .catch(err => console.log(err));
        }
        getListings(query)
    }, [query]);

    const handleClick = () => {
        console.log(list);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let processedString = `?plat=${inputs.platform}`;
        if (inputs.dlc) processedString = processedString.concat(`&dlc=${inputs.dlc}`);
        if (inputs.twoPlayers) processedString = processedString.concat(`&duo=${inputs.twoPlayers}`);
        if (inputs.useDepth) processedString = processedString.concat(`&depth=${inputs.depth}`);
        if (inputs.useBosses) {
            let [wl, bl] = processTargets(inputs.targets);
            if (wl != '..........') processedString = processedString.concat(`&wl=${wl}`);
            if (bl != '..........') processedString = processedString.concat(`&bl=${bl}`);
        }
        console.log(processedString);
        console.log(encodeURI(processedString));
        setQuery(encodeURI(processedString));
    }

    return (
        <div>
            <Hider label='Toggle Filter Display'>
                <FilterForm onSubmit = {handleSubmit} inputs={inputs} setInputs={setInputs} bosses={bosses} allBosses={allBosses} setQuery={setQuery}/>
            </Hider>
            <div className = {styles.listingsHolder}>
                {list.map(listing => <Listing key={listing.listingID}props={listing}/>)}
            </div>
            <input type="button" onClick={handleClick} value="print listings"/>
        </div>
    )
}
export default ListingsViewer;