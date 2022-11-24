const filters = document.querySelector('#filters')

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

getAllTags()