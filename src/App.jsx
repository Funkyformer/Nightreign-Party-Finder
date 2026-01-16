import Card from "./components/Card";
import Testing from "./components/Testing";

const Crd = Card(Testing);

function App() {
    return (
        <div className='content'>
            line of text
            <h1>WE HAVE A HEADING IN ALL CAPS</h1>
            okay so listen right
            <p>paragraph spacing</p>
            <p>remembering how this works</p>

            <Card>Testing</Card>

            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
            <h5>Header 5</h5>
            <h6>Header 6</h6>
            <iframe src="http://localhost:5173/" title="recursion"></iframe> 
            <b>This text is bold</b> 
            <strong>This text is important!</strong> 
            <em>This text is emphasized</em> 
            <p>My favorite color is <del>blue</del> <ins>red</ins>.</p>
            <p>Here is a quote from WWF's website:</p>
            <blockquote cite="http://www.worldwildlife.org/who/index.html">
            For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
            </blockquote> 

            <table>
                <thead>
                    <tr>
                        <th>Nightfarer</th>
                        <th>Main Stat(s)</th>
                        <th>Preferred Weapons</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Wylder</td>
                        <td>Quality</td>
                        <td>Greatswords</td>
                    </tr>
                    <tr>
                        <td>Recluse</td>
                        <td>Int, Faith</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>Ironeye</td>
                        <td>Dexterity</td>
                        <td>Bows</td>
                    </tr>
                    <tr>
                        <td>Guardian</td>
                        <td>Vigor</td>
                        <td>Halberds</td>
                    </tr>
                    <tr>
                        <td>Raider</td>
                        <td>Strength</td>
                        <td>Colossals</td>
                    </tr>
                    <tr>
                        <td>Executor</td>
                        <td>Dexterity, Arcane</td>
                        <td>Katanas</td>
                    </tr>
                    <tr>
                        <td>Duchess</td>
                        <td>Dex, Int</td>
                        <td>Daggers</td>
                    </tr>
                    <tr>
                        <td>Revenant</td>
                        <td>Faith</td>
                        <td>Claws</td>
                    </tr>
                </tbody>
            </table>
            <dl>
                <dt>Coffee</dt>
                <dd>- black hot drink</dd>
                <dt>Milk</dt>
                <dd>- white cold drink</dd>
            </dl> 
        </div>
    );
}

export default App;