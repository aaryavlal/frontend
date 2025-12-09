---
title: Fetch of Flask Backend Jokes
layout: post
description: An introductory example of Frontend talking to Backend Python Flask application serving jokes.  
permalink: /python/flask/api/jokes
image: /images/jokes.png
breadcrumb: true
show_reading_time: false
---
<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #4CAF50;
    color: white;
  }
  button {
    padding: 8px 16px;
    margin: 2px;
    cursor: pointer;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 4px;
  }
  button:hover {
    background-color: #005f7a;
  }
  .scenario-cell {
    font-weight: 500;
    max-width: 500px;
  }
</style>

<!-- HTML table fragment for page -->
<table>
  <thead>
  <tr>
    <th class="scenario-cell">Scenario</th>
    <th>Distributed Computing</th>
    <th>Parallel Computing</th>
    <th>Sequential Computing</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<script type="module">
  import { javaURI, pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  // prepare HTML defined "result" container for new output
  const resultContainer = document.getElementById("result");

  // keys for scenario voting options
  const DISTRIBUTED = "distributed";
  const PARALLEL = "parallel";
  const SEQUENTIAL = "sequential";

  // prepare fetch urls
  const url = `${pythonURI}/api/scenarios`;
  const getURL = url + "/";
  const distributedURL = url + "/distributed/";
  const parallelURL = url + "/parallel/";
  const sequentialURL = url + "/sequential/";

  // prepare fetch PUT options, clones with JS Spread Operator (...)
  const voteOptions = {...fetchOptions,
    method: 'PUT',
  }; // clones and replaces method


  // fetch the API to obtain scenarios data
  fetch(getURL, fetchOptions)
    .then(response => {
      if (response.status !== 200) {
        error('GET API response failure: ' + response.status);
        return;
      }
      response.json().then(data => {
        console.log(data);
        // format response data into a table
        for (const row of data) {
          // make "tr element" for each "row of data"
          const tr = document.createElement("tr");

          // td for scenario cell
          const scenario = document.createElement("td");
          scenario.className = "scenario-cell";
          scenario.innerHTML = row.id + ". " + row.scenario;

          // td for distributed cell with onclick actions
          const distributedCell = document.createElement("td");
          const distributedBtn = document.createElement('button');
          distributedBtn.id = DISTRIBUTED + row.id;
          distributedBtn.innerHTML = row.distributed;
          distributedBtn.onclick = function () {
            vote(DISTRIBUTED, distributedURL + row.id, distributedBtn.id);
          };
          distributedCell.appendChild(distributedBtn);

          // td for parallel cell with onclick actions
          const parallelCell = document.createElement("td");
          const parallelBtn = document.createElement('button');
          parallelBtn.id = PARALLEL + row.id;
          parallelBtn.innerHTML = row.parallel;
          parallelBtn.onclick = function () {
            vote(PARALLEL, parallelURL + row.id, parallelBtn.id);
          };
          parallelCell.appendChild(parallelBtn);

          // td for sequential cell with onclick actions
          const sequentialCell = document.createElement("td");
          const sequentialBtn = document.createElement('button');
          sequentialBtn.id = SEQUENTIAL + row.id;
          sequentialBtn.innerHTML = row.sequential;
          sequentialBtn.onclick = function () {
            vote(SEQUENTIAL, sequentialURL + row.id, sequentialBtn.id);
          };
          sequentialCell.appendChild(sequentialBtn);

          // finish row and append to DOM container
          tr.appendChild(scenario);
          tr.appendChild(distributedCell);
          tr.appendChild(parallelCell);
          tr.appendChild(sequentialCell);
          resultContainer.appendChild(tr);
        }
      })
    })
    .catch(err => {
      error(err + ": " + getURL);
    });

  // Function and interval to refresh the vote counts every 5 seconds
  function refreshVotes() {
    fetch(getURL, fetchOptions)
      .then(response => response.json())
      .then(data => {
        // update all vote data
        for (const row of data) {
          const distributedBtn = document.getElementById(DISTRIBUTED + row.id);
          if (distributedBtn) distributedBtn.innerHTML = row.distributed;
          const parallelBtn = document.getElementById(PARALLEL + row.id);
          if (parallelBtn) parallelBtn.innerHTML = row.parallel;
          const sequentialBtn = document.getElementById(SEQUENTIAL + row.id);
          if (sequentialBtn) sequentialBtn.innerHTML = row.sequential;
        }
      })
      .catch(err => {
        // Optionally handle refresh errors
        console.error('Refresh error:', err);
      });
  }
  // Call refreshVotes every 5 seconds
  setInterval(refreshVotes, 5000);

  // Vote function to handle user voting actions
  function vote(type, postURL, elemID) {

    // fetch the API
    fetch(postURL, voteOptions)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          error("POST API response failure: " + response.status)
          return;  // api failure
      }
      // valid response will have JSON data
      response.json().then(data => {
          console.log(data);
          // Update the appropriate button based on vote type
          if (type === DISTRIBUTED)
            document.getElementById(elemID).innerHTML = data.distributed;
          else if (type === PARALLEL)
            document.getElementById(elemID).innerHTML = data.parallel;
          else if (type === SEQUENTIAL)
            document.getElementById(elemID).innerHTML = data.sequential;
          else
            error("unknown type: " + type);  // should never occur
      })
    })
    // catch fetch errors (ie Nginx ACCESS to server blocked)
    .catch(err => {
      error(err + " " + postURL);
    });
  
  }

  // Something went wrong with actions or responses
  function error(err) {
    // log as Error in console
    console.error(err);
    // append error to resultContainer
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = err;
    td.setAttribute('colspan', '4');
    tr.appendChild(td);
    resultContainer.appendChild(tr);
  }

</script>