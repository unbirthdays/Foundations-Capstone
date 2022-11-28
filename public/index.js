const addFilter = document.querySelector('#addFilter');
const showMe = document.querySelector('#myBtn');
const result = document.querySelector('#restaurant-result');
const endDiv = document.querySelector('#end');
const loader = document.querySelector('#loader');
const redo = document.querySelector('#redo');
const generic = document.querySelector('#generic');

function getAllTags() {
    axios.get('/api/getAllTags')
        .then(res => {
            res.data.forEach(tag => {
                const option = document.createElement('option')
                option.setAttribute('value', tag['name'])
                option.textContent = tag.name
                filters.appendChild(option)
            })
        })
}


function addsFilter(e) {
  axios.get('/api/addTag')
      .then(res => {

      })
}


function clearResults() {
  result.innerHTML = ``; // need to have this to not pile up results
}

function showMyResults(e) {
  modal.style.display = "block"; 
  loader.style.display = "inline-block";
  e.preventDefault();
  clearResults();
  axios.get('/api/getRandomRestaurant')
    .then(res => {
      res.data.forEach(restaurant => {
        const randomRest = document.createElement('p');
        randomRest.innerHTML = `Eat at ${restaurant.name} today!<br><br>
        <button id="redo">Retry</button>`;
        
        setTimeout(() => {
          result.append(randomRest);
        }, 3000);

        setTimeout(() => {
          loader.style.display = "none";
        }, 3000)
      })
  })
}

function getGenericResult(e) {
  modal.style.display = "block"; 
  loader.style.display = "inline-block";
  e.preventDefault();
  clearResults();
  axios.get('/api/getRandomGenericTag')
    .then(res => {
        const randomCuisine = document.createElement('p');
        randomCuisine.innerHTML = `${res.data.name} cuisine sounds good!<br><br>
        <button id="redo">Retry</button>`;
        console.log(res.data);
        
        setTimeout(() => {
          result.append(randomCuisine);
        }, 3000);

        setTimeout(() => {
          loader.style.display = "none";
        }, 3000)
    })
  }


getAllTags()
addFilter.addEventListener('submit', addsFilter)
showMe.addEventListener('click', showMyResults)
generic.addEventListener('click', getGenericResult)

// NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Below is all stuff for the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}