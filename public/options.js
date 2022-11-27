const restaurants = document.querySelector('#restaurants')

function getAllRestaurants() { // reference lab with character
    axios.get('/api/getAllRestaurants')
        .then(res => {
            res.data.forEach(restaurant => {
                const card = document.createElement('div')
                card.className = "restaurant"

                html = "<h3>" + restaurant.name + "</h3>"
                html += "<ul>"
                for(let i = 0; i < restaurant.tags.length; i++) {
                    html += "<li>" + restaurant.tags[i] + "</li>"
                }
                html += "</ul>"
                card.innerHTML = html;

                restaurants.appendChild(card)
            })
        })
}

getAllRestaurants()
