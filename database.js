const { db } = require('./firebase');

async function getRestaurants(pageNumber, pageSize) {
    const restaurantsRef = db.collection('restaurants');

    // Calculate offset (documents to skip)
    const offset = (pageNumber - 1) * pageSize; 

    // Construct the query
    let query = restaurantsRef.select(
                                'restaurant_id', 
                                'restaurant_name', 
                                'restaurant_region', 
                                'restaurant_description'
                                )
                              .orderBy('restaurant_name')
                              .limit(pageSize)
                              .offset(offset);

    try {
        const snapshot = await query.get();
        const restaurants = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            restaurants.push({
                restaurant_id: doc.id,
                ...data 
            });
        });

        return restaurants;
    } catch (error) {
        throw new Error(`Error fetching restaurants: ${error.message}`);
    }
}

async function getMenuByRestaurantId(restaurantId) {
    const restaurantRef = db.collection('restaurants').doc(restaurantId);
    try {
        const doc = await restaurantRef.get();
        if (!doc.exists) {
            throw new Error(`Restaurant with ID ${restaurantId} not found`); 
        }

        const menu = doc.data().menu;
        return menu || []; // Return an empty array if no menu exists
    } catch (error) {
        throw new Error(`Error fetching menu for restaurant ${restaurantId}: ${error.message}`); 
    }
}

async function calculatePrice(restaurantId, itemIds) {
    const restaurantRef = db.collection('restaurants').doc(restaurantId);
    const doc = await restaurantRef.get();
    try {
        console.log(doc.data().menu)
        if (!doc.exists) {
            throw new Error(`Restaurant with ID ${restaurantId} not found`);
        }

    } catch (error) {
        throw new Error(`Error fetching menu for restaurant ${restaurantId}: ${error.message}`); 
    }
    const menu = doc.data().menu;
    let totalPrice = 0;
    try {
        itemIds.forEach(itemId => {
            const itemData = menu.find(item => item.item_id === itemId);
            if (!itemData) {
                console.log('hi')
                throw new Error(`Item with ID ${itemId} not found...`);
            }
            totalPrice += itemData.item_price
        });

        return { totalPrice };

    } catch (error) {
        console.log(error)
        throw new Error(`Error calculating order price: ${error.message}`); 
    }
}

module.exports = { getRestaurants, getMenuByRestaurantId, calculatePrice };