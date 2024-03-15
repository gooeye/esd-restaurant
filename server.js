const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();
const port = 3000; // Or any port you prefer
app.use(express.json());
app.use(cors());
// Route 1: Get a list of restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1;  // Page number, default to 1
        const pageSize = parseInt(req.query.pageSize) || 20; // Page size, default to 20

        const restaurants = await database.getRestaurants(pageNumber, pageSize);
        res.json(restaurants);
    } catch (error) {
         res.status(500).send('Error fetching restaurants'); // Use the existing error handling
    }
});


// Route 2: Get menu for a specific restaurant
app.get('/restaurants/:restaurant_id/menu', async (req, res) => {
    try {
        const restaurantId = req.params.restaurant_id;
        const menu = await database.getMenuByRestaurantId(restaurantId);

        if (!menu) {
            res.status(404).send('Menu not found');
        } else {
            res.json(menu);
        }
    } catch (error) {
        // Handle errors appropriately 
        res.status(500).send('Error fetching menu');
    } 
});

// Route 3: Get total price for a list of items
app.post('/price', async (req, res) => {
    try {
        const { restaurantId, itemIds } = req.body; // Attempt destructuring

        if (!restaurantId || !itemIds) {
            return res.status(400).send('Missing restaurantId or itemIds in the request body');
        }

        try {
            const orderPrice = await database.calculatePrice(restaurantId, itemIds);
            res.json(orderPrice);
        } catch (error) {
            res.status(500).send('Error calculating order price');
        }
    } catch (error) {
        console.error('Error parsing request body:', error.message);
        return res.status(400).send('Invalid request body format');
    }    
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});