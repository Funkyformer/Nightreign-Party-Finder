import axios from "axios";
import decodeList from "./decodeList";
import { useState, useEffect } from 'react';
function ListingsViewer() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const getListings = async () => {
            await axios.get('/all')
            .then(res => {
                setList(res.data.map(listing => decodeList(listing)));
            })
            .catch(err => console.log(err));
        }
        getListings()
    }, []);

    const handleClick = () => {
        console.log(list);
    }

    return (
        <div>
            <ul>
                { list.map(listing =>
                    <li key={listing.listingID}>{listing.listingID}</li>
                )}
            </ul>
            <input type="button" onClick={handleClick} value="print listings"/>
        </div>
    )
}
export default ListingsViewer;