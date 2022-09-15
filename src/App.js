import React, {useEffect, useState} from 'react';
import config from "./api/config";
import sheet_key from "./api/sheet";
import logo from './logo.svg';
import './App.css';
//import 'semantic-ui-css/semantic.min.css';

const spreadsheetID = '12AWolV6lI99LM6NNP1bUwYanAuNDSWRJI8X4-ozM98Q';


//import { GoogleSpreadsheet } from 'google-spreadsheet';
const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet(spreadsheetID);
//const doc = new GoogleSpreadsheet('1JXha33UfFDKxfp8t909DC1BjurckxPB1xMN__f3FzZk');
//const creds = require('./config/myproject-361608-63d17026f60b.json');

function App() {
	const [name, setName] = useState("");
	const [count, setCount] = useState(0);
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(`The name you entered was: ${name} :: ${setName}`);
        const newRow = { ID: name };
        const sheet = doc.sheetsById[1318890137];
        console.log("Append to " + sheet.title + " " + sheet.rowCount);
        await sheet.addRow(newRow);
        setName('');
	}


    async function initializeWorker() {
        console.log('initilizeWorker' + config.type);
        console.log(config);
        await doc.useServiceAccountAuth(config);
        console.log('Succeeded to Auth');
        await doc.loadInfo(); // loads document properties and worksheets
        console.log('Succeeded to load');
        const sheet = doc.sheetsById[1318890137];
        await sheet.loadCells('A1:J1');
        for (let i = 0 ; i < 10 ; i++)
        {
            const cell = sheet.getCell(0,i);
            console.log(cell.value);
        }
        console.log(sheet_key.id);
        console.log(sheet_key.name);
        console.log(sheet.cellStats);
    }

	useEffect(() => {
		setTimeout(() => {
            console.log('SetTimeout');
			setCount((count) => count + 1);
		}, 1000);
	}, []);

    useEffect(function () {
        initializeWorker();
    },  []);

    useEffect(function () {
        console.log('name changed ' + name);
    },  [name]);
	const clickButton = () => {
		console.log("Clicked");
		alert("Clicked");
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload {count}.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button onClick={clickButton}>
					Click
				</button>
				<form onSubmit={handleSubmit}>
					<label>Enter your name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<input type="submit" />
				</form>
			</header>
		</div>
	);
}

export default App;
