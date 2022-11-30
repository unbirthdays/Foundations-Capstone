const filters = document.querySelector('#filters');
const addFilter = document.querySelector('#addFilter');
const addedFilters = document.querySelector('#added-filters');
const deleteBtn = document.querySelector('#deleter');
const addOption = document.querySelector('#add-option');
const inputRestaurantName = document.querySelector('#restaurant-name');

let addedFiltersList = [];

function getAllTags() {
    axios.get('/api/getAllTags')
        .then(res => {
            res.data.forEach(tag => {
                const option = document.createElement('option');
                option.setAttribute('value', tag['name']);
                option.textContent = tag.name;
                filters.appendChild(option);
            });
        });
}

function updateAddedFilters() {
    innerHTML = ``;
    for(let i = 0; i < addedFiltersList.length; i++) {
      innerHTML += `<li>${addedFiltersList[i]} <button id="remove-filter-${addedFiltersList[i]}" class="remove-added-filter" title="Remove this filter!"><img style="vertical-align:sub" height="15px" src="./images/trash-can.png"/></button></li>`;
    }
  
    addedFilters.innerHTML = innerHTML;
}

function addsFilter(e) {
    let filter = filters.options[ filters.selectedIndex ].value;
    if(filter != '' && addedFiltersList.indexOf(filter) === -1) {
        addedFiltersList.push(filter);
    }
  
    updateAddedFilters();
}

function removeAddedFilter(e) {
    let div = e.target;
    if(e.target.tagName == "IMG") {
      div = e.target.parentElement;
    }
    
    if(div.className == "remove-added-filter") {
      let divId = div.id;
      filter = divId.split("remove-filter-")[1];
      
      addedFiltersList.splice(addedFiltersList.indexOf(filter), 1);
      updateAddedFilters();
    }
}

function deleteFilters(e) {
    e.preventDefault();
    if(confirm("Are you really sure you want to remove all filters?")) {
      addedFiltersList = [];
      updateAddedFilters();
    }
}

function addsOption(e) {
    axios.post('/api/addRestaurant', {
        name: inputRestaurantName.value,
        tags: addedFiltersList.join(",")
    }).then(res => {
        alert('Restaurant added successfully!');
        inputRestaurantName.value = "";
        filters.selectedIndex = 0;
        addedFiltersList = [];
        updateAddedFilters();
    }).catch(err => {
        alert('A restaurant with this name already exists.\r\nPlease choose a new restaurant name and try again.');
    });
}


getAllTags();
addFilter.addEventListener('click', addsFilter);
addedFilters.addEventListener('click', removeAddedFilter);
deleteBtn.addEventListener('click', deleteFilters);
addOption.addEventListener('click', addsOption);
