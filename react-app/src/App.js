import React, { useEffect, useState } from "react";
import './App.css';

const url = 'http://localhost:3001/suppliers';
function App() {
  const [stage, setStage] = useState([]);

  const makeSynchronousHttpRequest = () => {
    setStage(['Loading synchronously']);
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Define the request method, URL, and set it to synchronous (false)
    xhr.open('GET', url, false);

    // Send the request
    xhr.send();

    let response;
    // Check the status of the response
    if (xhr.status === 200) {
      // Request was successful, and response is available in xhr.responseText
      console.log('Response Data:', xhr.responseText);

      setStage(xhr.responseText);
    } else {
      // Request failed; handle the error
      console.error('Request Error:', xhr.status, xhr.statusText);
      setStage(xhr.statusText);
    }
  }

  const makeHttpRequestAsync = () => {

    setStage(['Loading asynchronously']);
    // Make an asynchronous GET request using the fetch API
    fetch(url)
        .then((response) => {
          // Check if the response status is OK (status code 200)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the response JSON and return it
          return response.json();
        })
        .then((data) => {
          // Handle the data from the response
          console.log('Response Data:', data);
          setStage(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error('Request Error:', error);
          setStage(error);
        });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Suppliers</h1>

        <button id="myButton" onClick={makeSynchronousHttpRequest}>Fetch non-async</button>
        <button id="myOtherButton" onClick={makeHttpRequestAsync}>Fetch Async</button>
        <br/>
        <br/>
        <br/>
        {JSON.stringify(stage)}
      </header>


    </div>
  );
}

export default App;
