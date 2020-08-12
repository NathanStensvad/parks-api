function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for(let i=0; i<responseJson.data.length;i++) {
    $('#results-list').append(
      `<li>
      <h3>Name: ${responseJson.data[i].fullName}</h3>
      <p>Description: ${responseJson.data[i].description}
      <p>Website: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].name}</a></p> 
      <p>Address: <a href="${responseJson.data[i].directionsUrl}" target="_blank">${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</a></p>
      </li>`
    )};

    $('#results').removeClass('hidden');
}

function getParks(parkName, maxResults) {
  const url = "https://developer.nps.gov/api/v1/parks?stateCode=" + parkName + "&limit=" + maxResults + "&api_key=fwhv851Isj1gsxCqgrG5kjzZpyTcivnAAQfroDGG";

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      alert("Something went wrong");
    });
}

function formSearch() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const parkName = $('#js-park-name').val();
    const maxResults = $('#js-max-results').val();
    console.log(parkName+" "+maxResults);
    getParks(parkName, maxResults);
  });
}

formSearch();