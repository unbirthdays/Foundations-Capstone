const addFilter = document.querySelector('#addFilter');
const showMe = document.querySelector('#myBtn');
const result = document.querySelector('#restaurant-result');

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
  e.preventDefault();
}

function showMyResults(e) {
  e.preventDefault();
  axios.get('/api/getRandomRestaurant')
    .then(res => {
      res.data.forEach(restaurant => {
        const randomRest = document.createElement('p');
        randomRest.innerText = restaurant.name;
        result.append(randomRest);
      })
  })
}

function delay() {
  setTimeout(() => {
    showMyResults();
  }, 2000);
}

getAllTags()
addFilter.addEventListener('submit', addsFilter)
showMe.addEventListener('click', showMyResults)

// NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Below is all stuff for the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}