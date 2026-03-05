import { useEffect, useState } from 'react';
import styles from './CSS Modules/EditForm.module.css'
import Listing from './Listing';

function EditForm({data, setData}) {
    const [origData] = useState(data);
    // useEffect(() => {
    //     setData({hi:0});
    // }, [])

    const reset = () => {
        setData({...origData, char01: data.char01, char02: data.char02, char03: data.char03})
    }
    

    return (
        <div>
            <input type='button' onClick = {() => console.log(origData)} value="print originals"/>
            <input type='button' onClick = {() => console.log(data)} value="print currents"/>
            <input type='button' onClick = {reset} value="reset data"/>
            <Listing props={data}/>
        </div>
    )
}

export default EditForm;