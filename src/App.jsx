import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreateListing from "./CreateListing";
import Header from "./components/Header";
import ViewListings from "./ViewListings";
import ListingDetails from "./ListingDetails";
import { useState } from "react";
import Registration from "./components/Registration";

function App() {
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => setShowLogin(!showLogin);

    return (
        <BrowserRouter>
            <input type='button' value="Show Modal" onClick={toggleLogin} />
            <Header/>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/create" Component={CreateListing}/>
                <Route path="/view" Component={ViewListings}/>
                <Route path="/view/:listingid" Component={ListingDetails}/>
            </Routes>
            {
                showLogin?
                <Registration onClose={toggleLogin}/> :
                null
            }
        </BrowserRouter>
    );
}

export default App;