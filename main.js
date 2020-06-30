const apiKey = 'YnTp07EFjZbmJ4nxTff3eezhZbXolsytp1o6p66Y';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
function addStateHTML(i) {
  return (
    `<select name="state" id="` +
    i +
    `" required>
<option value="" selected="selected">Select a State</option>
<option value="AL">Alabama</option>
<option value="AK">Alaska</option>
<option value="AZ">Arizona</option>
<option value="AR">Arkansas</option>
<option value="CA">California</option>
<option value="CO">Colorado</option>
<option value="CT">Connecticut</option>
<option value="DE">Delaware</option>
<option value="DC">District Of Columbia</option>
<option value="FL">Florida</option>
<option value="GA">Georgia</option>
<option value="HI">Hawaii</option>
<option value="ID">Idaho</option>
<option value="IL">Illinois</option>
<option value="IN">Indiana</option>
<option value="IA">Iowa</option>
<option value="KS">Kansas</option>
<option value="KY">Kentucky</option>
<option value="LA">Louisiana</option>
<option value="ME">Maine</option>
<option value="MD">Maryland</option>
<option value="MA">Massachusetts</option>
<option value="MI">Michigan</option>
<option value="MN">Minnesota</option>
<option value="MS">Mississippi</option>
<option value="MO">Missouri</option>
<option value="MT">Montana</option>
<option value="NE">Nebraska</option>
<option value="NV">Nevada</option>
<option value="NH">New Hampshire</option>
<option value="NJ">New Jersey</option>
<option value="NM">New Mexico</option>
<option value="NY">New York</option>
<option value="NC">North Carolina</option>
<option value="ND">North Dakota</option>
<option value="OH">Ohio</option>
<option value="OK">Oklahoma</option>
<option value="OR">Oregon</option>
<option value="PA">Pennsylvania</option>
<option value="RI">Rhode Island</option>
<option value="SC">South Carolina</option>
<option value="SD">South Dakota</option>
<option value="TN">Tennessee</option>
<option value="TX">Texas</option>
<option value="UT">Utah</option>
<option value="VT">Vermont</option>
<option value="VA">Virginia</option>
<option value="WA">Washington</option>
<option value="WV">West Virginia</option>
<option value="WI">Wisconsin</option>
<option value="WY">Wyoming</option>
</select>`
  );
}
function stateSubmit() {
  let i = 1;
  $('input#addState').click(function (e) {
    e.preventDefault();
    $('input#addState').before(addStateHTML(i));
    i++;
  });
  $('form').submit(function () {
    i = 1;
  });
}
function formSubmit() {
  $('form').submit(function (e) {
    e.preventDefault();
    $('section ul,hr').remove();
    getParks();
  });
}
function formartQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join('&');
}
function getStates() {
  const codes = [];
  const numberOfCodes = $('select').length;
  for (let i = 0; i <= numberOfCodes; i++) {
    codes.push($(`select#` + i + ``).val());
    if (i >= 1) {
      $(`#` + i + ``).remove();
    }
  }
  return codes;
}
function getParks() {
  const params = {
    stateCode: getStates(),
    limit: $('#number').val(),
    api_key: apiKey,
  };
  const queryString = formartQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw error;
    })
    .then((responseJSON) => returnResults(responseJSON))
    .catch((error) => alert(error));
}
function resultsHTML(element) {
  return (
    `<ul>
  <li>Park Name: ` +
    element.fullName +
    `</li>
  <li>Park Discription: ` +
    element.description +
    `</li>
  <li>Website URL: <a href="` +
    element.url +
    `">` +
    element.url +
    `</a></li>
  </ul><hr>`
  );
}
function returnResults(responseJSON) {
  console.log(responseJSON);
  responseJSON.data.forEach((element) => {
    $('section').append(resultsHTML(element));
  });
  $('section').removeClass('hidden');
}
function handleForm() {
  stateSubmit();
  formSubmit();
}
$(handleForm);
