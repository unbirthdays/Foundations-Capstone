const restaurants = document.querySelector('#restaurants')

function getAllRestaurants() { // reference lab with cards
    restaurants.innerHTML = "";
    axios.get('/api/getAllRestaurants')
        .then(res => {
            res.data.forEach(restaurant => {
                const card = document.createElement('div');
                card.className = "restaurant";
                card.title = restaurant.name;

                html = `
                <div style="display: flex; justify-content: space-between">
                    <div class='restaurant-title'>${restaurant.name}</div>
                    <div class='delete-restaurant'>
                        <button class='delete-restaurant-btn' title='Delete this restaurant from the database!'>
                            <img style='vertical-align:sub' height='15px' src='./images/trash-can.png'/>
                        </button>
                    </div>
                </div>
                <ul>`

                tags = restaurant.tags.sort()
                for(let i = 0; i < restaurant.tags.length; i++) {
                    html += "<li>" + restaurant.tags[i] + "</li>";
                }
                html += "</ul>";
                card.innerHTML = html;

                restaurants.appendChild(card);
            })
        })
}

function deleteRestaurant(e) {
    let div = e.target;
    if(e.target.tagName == "IMG") {
        div = e.target.parentElement;
    }
    
    if(div.className == "delete-restaurant-btn") {
        while(div.className != "restaurant") {
            div = div.parentElement;
        }

        restaurantName = div.title
        if(confirm(`Are you sure you want to delete ${restaurantName} from the database?`)) {
            axios.delete(`/api/deleteRestaurant?name=${restaurantName}`)
            .then(res => {
                console.log(res);
                // alert(`${restaurantName} has been deleted from the database!`);
            })

            getAllRestaurants();
        }
    }
}

getAllRestaurants()
restaurants.addEventListener('click', deleteRestaurant)
