import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {DIDManager, IPLDManager} from 'xdv-universal-wallet';

async function App() {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const didManager = new DIDManager();
  const pin = this.pin;
  const didRSA = await didManager.create3ID_RSA();
  await didRSA.did.authenticate();

  const ipfsManager = new IPLDManager(didRSA.did);
  await ipfsManager.start('http://ifesa.ipfs.pa:5001');
  this.ipfs = ipfsManager;

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = async () => {
    const cid = await ipfsManager.addSignedObject(u8array, {
      // file name
        name: file.name,
        // mime 
        contentType: file.type,
        // file last modified
        lastModified: new Date(file.lastModified),
        // optional, PEM certificate
        certificate: didRSA.certificate,
      } );
	};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>

    </div>
  );
}

export default App;
