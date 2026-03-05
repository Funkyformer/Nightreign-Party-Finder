import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreateListing from "./CreateListing";
import Header from "./components/Header";
import ViewListings from "./ViewListings";
import ListingDetails from "./ListingDetails";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/create" Component={CreateListing}/>
                <Route path="/view" Component={ViewListings}/>
                <Route path="/view/:listingid" Component={ListingDetails}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;