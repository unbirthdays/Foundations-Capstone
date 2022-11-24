const { application } = require("express");

require("dotenv").config();
const {DATABASE_URL} = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

function convertTagsToList(tags) {
    return tags.split(",");
}


module.exports = {

    seed: (req, res) => {
        sequelize.query(`
            CREATE TABLE tags (
                name varchar primary key,
                type varchar not null
            );

            INSERT INTO tags (name, type)
            VALUES ('Affordable', 'Specific'),
            ('Alcohol Available', 'Specific'),
            ('American', 'Generic'),
            ('Asian', 'Generic'),
            ('Bakery', 'Specific'),
            ('Breakfast', 'Specific'),
            ('Burgers', 'Specific'),
            ('Cafe', 'Specific'),
            ('Casual Dining', 'Specific'),
            ('Chicken Wings', 'Specific'),
            ('Chinese', 'Generic'),
            ('Customizable', 'Specific'),
            ('Deli', 'Specific'),
            ('Fast Casual', 'Specific'),
            ('Fast Food', 'Specific'),
            ('French', 'Generic'),
            ('Fried Chicken', 'Specific'),
            ('Gluten-Free Friendly', 'Specific'),
            ('Healthy', 'Specific'),
            ('Italian', 'Generic'),
            ('Japanese', 'Generic'),
            ('Mediterranean', 'Generic'),
            ('Mexican', 'Generic'),
            ('Pizza', 'Specific'),
            ('Pollotarian', 'Specific'),
            ('Ramen', 'Specific'),
            ('Salad', 'Specific'),
            ('Seafood', 'Specific'),
            ('Soup', 'Specific'),
            ('Steak', 'Specific'),
            ('Sushi', 'Specific'),
            ('Vegan', 'Specific'),
            ('Vegetarian', 'Specific'),
            ('Vietnamese', 'Generic');

            CREATE TABLE restaurants (
                name varchar primary key,
                tags varchar not null
            );

            INSERT INTO restaurants (name, tags)
            VALUES ('Panda Express','Asian,Chinese,Fast Casual,Affordable'),
            ('Church''s','Affordable,Pollotarian,Fried Chicken,Fast Food'),
            ('Domino''s','Pizza,Affordable,Chicken Wings,Customizable,Gluten-Free Friendly'),
            ('Olive Garden','Italian,Soup,Salad,Casual Dining,Alcohol Available'),
            ('Pizza Hut','Pizza,Affordable,Chicken Wings,Customizable'),
            ('Popeyes','Affordable,Pollotarian,Fried Chicken,Fast Food'),
            ('McDonalds','Fast Food,Affordable,Burgers'),
            ('Sonic','Fast Food,Affordable,Burgers'),
            ('Burger King','Fast Food,Affordable,Burgers'),
            ('Salata','Fast Casual,Healthy,Salad,Customizable,Vegetarian,Vegan,Gluten-Free Friendly'),
            ('Subway','Deli,Fast Food,Customizable'),
            ('Wendy''s','Fast Food,Affordable,Burgers'),
            ('Panera Bread','Fast Casual,Soup,Salad,Bakery'),
            ('Noodles & Co.','Fast Casual,Soup,Salad,Customizable'),
            ('Chipotle','Mexican,Fast Casual,Customizable'),
            ('Tender Greens','Healthy,Salad,Vegetarian,Fast Casual,Customizable,Vegan'),
            ('Sweetgreen','Healthy,Salad,Vegetarian,Fast Casual,Customizable,Vegan'),
            ('In-n-Out','Affordable,Fast Food,Burgers'),
            ('Shake Shack','Fast Food,Burgers'),
            ('Taco Bell','Mexican,Affordable,Fast Food'),
            ('Blaze Pizza','Pizza,Italian,Fast Casual,Customizable,Gluten-Free Friendly,Alcohol Available'),
            ('Chick-fil-A','Fast Food,Pollotarian,Affordable'),
            ('KFC','Fast Food,Pollotarian,Fried Chicken,Affordable'),
            ('Buffalo Wild Wings','American,Chicken Wings,Casual Dining,Alcohol Available'),
            ('Pluckers','American,Chicken Wings,Casual Dining,Alcohol Available'),
            ('Hooters','American,Chicken Wings,Casual Dining,Alcohol Available'),
            ('Chili''s','American,Casual Dining,Alcohol Available'),
            ('Papa John''s','Pizza,Affordable,Chicken Wings,Customizable,Gluten-Free Friendly'),
            ('IHOP','Breakfast,American,Casual Dining'),
            ('Denny''s','Breakfast,American,Casual Dining'),
            ('Texas Roadhouse','Steak,American,Alcohol Available'),
            ('Outback Steakhouse','American,Steak,Alcohol Available'),
            ('Cane''s','Fast Casual,Fried Chicken,Affordable'),
            ('Red Lobster','Seafood,Casual Dining,Alcohol Available'),
            ('Wingstop','Chicken Wings,Alcohol Available'),
            ('Waffle House','Breakfast,American,Casual Dining,Affordable'),
            ('Five Guys','Fast Food,Burgers'),
            ('Qdoba','Fast Casual,Mexican,Customizable'),
            ('Flower Child','Healthy,Gluten-Free Friendly,Salad,Vegan,Vegetarian,Alcohol Available'),
            ('Potbelly','Deli,Customizable,Soup'),
            ('Which Wich','Deli,Customizable'),
            ('La Madeleine','French,Casual Dining,Cafe,Soup,Salad,Bakery,Alcohol Available'),
            ('Cava','Mediterranean,Fast Casual,Customizable'),
            ('Jinya','Ramen,Asian,Japanese,Casual Dining,Alcohol Available'),
            ('Kura','Japanese,Sushi,Asian,Affordable,Seafood'),
            ('Maggiano''s','Italian,Soup,Salad,Casual Dining,Alcohol Available'),
            ('Pappadeaux''s','Seafood,Casual Dining,Alcohol Available,Steak'),
            ('Long John Silver''s','Seafood,Fast Food,Affordable'),
            ('Pho Hua','Asian,Vietnamese,Casual Dining'),
            ('Starbucks','Cafe,Bakery'),
            ('BJ''s','American,Casual Dining');`)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err));
    },

    getAllRestaurants: (req, res) => {
        sequelize.query(`SELECT name, tags FROM restaurants ORDER BY name ASC;`)
        .then((dbRes) => {
            data = []
            for(let i = 0; i < dbRes[0].length; i++) {
                tags = convertTagsToList(dbRes[0][i]["tags"])
                data.push({
                    "name": dbRes[0][i]["name"],
                    "tags": tags
                })
            }

            res.status(200).send(data)
        }).catch(err => console.log('error getting all restaurants', err))
    },

    getRestaurants: (req, res) => {
        query = "SELECT name, tags FROM restaurants ORDER BY name ASC"
        if(req.query.filters != undefined) {
            filters = req.query.filters.split(",");
            for(let i = 0; i < filters.length; i++) {
                if(i == 0) {
                    query += " WHERE tags LIKE '%" + filters[i] + "%'"
                } else {
                    query += " AND tags LIKE '%" + filters[i] + "%'"
                }
            }
        }
        query += ";"
        sequelize.query(query)
        .then((dbRes) => {
            data = []
            for(let i = 0; i < dbRes[0].length; i++) {
                tags = convertTagsToList(dbRes[0][i]["tags"])
                data.push({
                    "name": dbRes[0][i]["name"],
                    "tags": tags
                })
            }

            res.status(200).send(data)
        }).catch(err => console.log('error getting restaurants', err))
    },

    getRestaurant: (req, res) => {
        sequelize.query(`SELECT name, tags FROM restaurants WHERE name='${req.query.name}';`)
        .then((dbRes) => {
            data = {
                "name": dbRes[0][0]["name"],
                "tags": convertTagsToList(dbRes[0][0]["tags"])
            }

            res.status(200).send(data)
        }).catch(err => console.log('error getting restaurant', err))
    },

    getRandomRestaurant: (req, res) => {
        query = "SELECT name, tags FROM restaurants"
        if(req.query.filters != undefined) {
            filters = req.query.filters.split(",");
            for(let i = 0; i < filters.length; i++) {
                if(i == 0) {
                    query += " WHERE tags LIKE '%" + filters[i] + "%'"
                } else {
                    query += " AND tags LIKE '%" + filters[i] + "%'"
                }
            }
        }
        query += " ORDER BY RANDOM() LIMIT 1;"
        console.log(query)
        sequelize.query(query)
        .then((dbRes) => {
            data = {
                "name": dbRes[0][0]["name"],
                "tags": convertTagsToList(dbRes[0][0]["tags"])
            }

            res.status(200).send(data)
        }).catch(err => console.log('error getting random restaurant', err))
    },

    addRestaurant: (req, res) => {
        sequelize.query(`INSERT INTO restaurants(name, tags) VALUES('${req.body.name}', '${req.body.tags}');`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('error adding new restaurant', err))
    },

    deleteRestaurant: (req, res) => {
        sequelize.query(`DELETE FROM restaurants WHERE name='${req.query.name}';`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('error deleting restaurant', err))
    },

    getAllTags: (req, res) => {
        sequelize.query(`SELECT * FROM tags ORDER BY name ASC;`).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('error getting all tags', err))
    },

    getRandomGenericTag: (req, res) => {
        sequelize.query(`SELECT name FROM tags WHERE type='Generic' ORDER BY RANDOM() LIMIT 1;`).then((dbRes) => {
            res.status(200).send(dbRes[0][0])
        }).catch(err => console.log('error getting random generic tag', err))
    },

    addTag: (req, res) => {
        sequelize.query(`INSERT INTO tags(name, type) VALUES('${req.body.name}', '${req.body.type}');`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('error adding new tag', err))
    },

    deleteTag: (req, res) => {
        sequelize.query(`DELETE FROM tags WHERE name='${req.query.name}';`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('error deleting tag', err))
    }
}