const { db } = require('./firebase');

// Function to generate semi-random data
function generateData() {
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    return {
        restaurant_name: `Restaurant ${Math.floor(Math.random() * 100) + 1}`,
        restaurant_region: regions[Math.floor(Math.random() * regions.length)],
        restaurant_description: 'A cozy restaurant with a delicious menu.',
        menu: [
            { item_id: 'item_1', item_name: 'Tasty Burger', item_description: 'Juicy patty with all the fixings', item_price: 12.99 },
            { item_id: 'item_2', item_name: 'Garden Salad', item_description: 'Fresh and vibrant', item_price: 8.99 },
        ]

        // restaurant_name: `G's Special Food Place`,
        // restaurant_region: regions[0],
        // restaurant_description: 'The Best Restaurant',
        // menu: [
        //     { item_id: '1', item_name: 'Special Sauce', item_description: 'Weird looking sauce', item_price: 4.20 },
        //     { item_id: '2', item_name: 'Rice', item_description: 'White rice. Just 1 grain.', item_price: 1.00 },
        //     { item_id: '3', item_name: 'Aglio Olio', item_description: 'Good spaghetti', item_price: 7.00 },
        //     { item_id: '4', item_name: 'Garlic Bread', item_description: 'Garlic bread', item_price: 3.00 },
        // ]
    };
}

async function seedFirestore() {
    const numRestaurants = 1; // Adjust the number of restaurants as needed

    for (let i = 0; i < numRestaurants; i++) {
        const data = generateData();

        // Add restaurant document
        const restaurantRef = db.collection('restaurants').doc(); // Auto-generate restaurant_id
        await restaurantRef.set(data); 
    }

    console.log('Firestore seeded with dummy data!');
}

seedFirestore();