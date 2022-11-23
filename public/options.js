const restaurants = document.querySelector('#restaurants')
const tags = document.querySelector('#tags')

function getAllRestaurants() {
    axios.get('/api/getAllRestaurants')
        .then(res => {
            res.data.forEach(restaurant => {
                const card = document.createElement('div')
                card.textContent = restaurant.name + ": " + restaurant.tags
                restaurants.appendChild(card)
            })
        })
}

function getAllTags() {
    axios.get('/api/getAllTags')
        .then(res => {
            res.data.forEach(tag => {
                const card = document.createElement('div')
                card.textContent = tag.name
                tags.appendChild(card)
            })
        })
}

getAllRestaurants()
getAllTags()