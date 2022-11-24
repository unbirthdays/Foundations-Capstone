const filters = document.querySelector('#filters');
const addFilter = document.querySelector('#addFilter');

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

    let userRating = document.querySelector('input[name="rating"]:checked').value
    let body = {
        name: nameInput.value, 
        rating: +userRating, 
        countryId: +countrySelect.value
    }

    axios.post('http://localhost:8080/cities', body)
        .then(() => {
            countrySelect.value = 1
            nameInput.value = ''
            document.querySelector('#rating-one').checked = true
            getCities()
        })
}

getAllTags()
addFilter.addEventListener('submit', addsFilter)

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
