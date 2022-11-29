const filters = document.querySelector('#filters');
const addFilter = document.querySelector('#addFilter');
const selectedFilters = document.querySelector('#selected-filters');
const showMe = document.querySelector('#myBtn');
const result = document.querySelector('#restaurant-result');
const endDiv = document.querySelector('#end');
const loader = document.querySelector('#loader');
const redo = document.querySelector('#redo');
const generic = document.querySelector('#generic');
const deleteBtn = document.querySelector('#deleter');

let selectedFiltersList = []

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


function updateSelectedFilters() {
  innerHTML = ``
  for(let i = 0; i < selectedFiltersList.length; i++) {
    // innerHTML += `<li>${selectedFiltersList[i]} <button id="remove-filter-${selectedFiltersList[i]}" class="remove-selected-filter" title="Remove this filter!"></button></li>`
    innerHTML += `<li>${selectedFiltersList[i]} <button id="remove-filter-${selectedFiltersList[i]}" class="remove-selected-filter" title="Remove this filter!"><img style="vertical-align:sub" height="15px" src="./images/trash-can-white.png"/></button></li>`
  }

  selectedFilters.innerHTML = innerHTML;
}


function addsFilter(e) {
  let filter = filters.options[ filters.selectedIndex ].value;
  if(filter != '' && selectedFiltersList.indexOf(filter) === -1) {
    selectedFiltersList.push(filter);
  }

  updateSelectedFilters()
}

function removeSelectedFilter(e) {
  let div = e.target;
  if(e.target.tagName == "IMG") {
    div = e.target.parentElement;
  }
  
  if(div.className == "remove-selected-filter") {
    let divId = div.id;
    filter = divId.split("remove-filter-")[1]
    
    selectedFiltersList.splice(selectedFiltersList.indexOf(filter), 1);
    updateSelectedFilters();
  }
}


function clearResults() {
  result.innerHTML = ``; // need to have this to not pile up results
}

function showMyResults(e) {
  modal.style.display = "block"; 
  loader.style.display = "inline-block";
  e.preventDefault();
  clearResults();
  axios.get('/api/getRandomRestaurant', { params: { filters: selectedFiltersList.join(",") } })
    .then(res => {
      if(res.data != '') {
        let restaurant = res.data.name
        const randomRest = document.createElement('div');
        randomRest.innerHTML = `<span style="font-size:24px">Eat at <span style="color:#AFE4F4"><b>${restaurant}</b></span> today!</span><br><br>
        <img height="200px" src="./images/bear-eating.gif"/>`;
        
        setTimeout(() => {
          result.append(randomRest);
        }, 3000);

        setTimeout(() => {
          loader.style.display = "none";
        }, 3000)
      }
      else {
        const randomRest = document.createElement('div');
        randomRest.innerHTML = `<span style="font-size:24px">Sorry, we couldn't find a restaurant that matches the selected filters! Please change the filters and try again.</span><br><br>
        <img height="200px" src="./images/bear-shrug.gif"/>`;
        
        setTimeout(() => {
          result.append(randomRest);
        }, 3000);

        setTimeout(() => {
          loader.style.display = "none";
        }, 3000)
      }
  })
}

function getGenericResult(e) {
  modal.style.display = "block"; 
  loader.style.display = "inline-block";
  e.preventDefault();
  clearResults();
  axios.get('/api/getRandomGenericTag')
    .then(res => {
        const cuisine = res.data.name;
        const randomCuisine = document.createElement('p');
        randomCuisine.innerHTML = `<span style="font-size:24px"><span style="color:#AFE4F4"><b><b>${cuisine}</b></span> cuisine sounds good!</span>
        <br><br><img height="200px" src="./images/bear-eating.gif"/>`;
        
        setTimeout(() => {
          result.append(randomCuisine);
        }, 3000);

        setTimeout(() => {
          loader.style.display = "none";
        }, 3000)
    })
  }

  function deleteFilters(e) {
    e.preventDefault();
    if(window.confirm("Are you really sure you want to delete all filters?")) {
      selectedFiltersList = [];
      updateSelectedFilters();
    }
  }


getAllTags()
addFilter.addEventListener('click', addsFilter)
selectedFilters.addEventListener('click', removeSelectedFilter)
showMe.addEventListener('click', showMyResults)
generic.addEventListener('click', getGenericResult)
deleteBtn.addEventListener('click', deleteFilters)

// NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Below is all stuff for the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}