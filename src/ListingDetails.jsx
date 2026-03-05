import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Hider from "./components/Hider";
import decodeList from "./components/decodeList";
import EditForm from "./components/EditForm";
import styles from "./CSS Modules/ListingDetails.module.css";

function ListingDetails() {

    const [mode, setMode] = useState('');
    const [data, setData] = useState({});
    const {listingid} = useParams();

    useEffect(() => {
        const getListing = async () => {
            await axios.get(`/listings/${listingid}`)
            .then(function(res) {
                console.log(res);
                setMode(res.status);
                setData(decodeList(res.data));
            })
            .catch(function(err) {
                console.log(err);
                setMode(err.response.status);
            });
        }
        getListing();
    }, []);

    return (
        mode == '200' ?
        <div className='content'>
            <Hider label='Toggle Listing Details'>
                <EditForm data={data} setData={setData} styles={styles}/>
            </Hider>
            <div>
                pretend chat goes here
            </div>
        </div> :
        <div>
            {mode}
        </div>
    )
}
export default ListingDetails;