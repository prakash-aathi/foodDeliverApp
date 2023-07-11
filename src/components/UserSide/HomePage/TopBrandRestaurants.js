import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import "./TopBrandRestaurants.css"; // Import the CSS file for styling

const TopBrandRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);

//   const [restaurants,setRestaurants] = useState([
//     {
//       name: "KFC",
//       deliveryTime: "20-30 minutes",
//       image: "https://e7.pngegg.com/pngimages/838/175/png-clipart-colonel-sanders-kfc-fried-chicken-logo-mcdonald-s-kfc-s-company-fast-food-restaurant.png",
//       items: [
//         {
//           name: "Chicken Popcorn-Large",
//           deliveryTime: "20 minutes",
//          price: "248",
//           image: "https://kfcbd.com/storage/products/R28Oo4W2rlIFNg9gkYExcsD5K.jpg",
//         },
//         {
//           name: "Hot & Crispy Chicken -2pc",
//           deliveryTime: "15 minutes",
//           price: "229",
//           image: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K008.jpg?ver=27.37",
//         },
//         {
//           name: "All in One Bucket",
//           deliveryTime: "25 minutes",
//           price: "548",
//           image: "https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/56c9ab92bd79745fd152a30fa2525426",
//         },
//         {
//           name: "Chicken Zinger Burger - Tandoori",
//           deliveryTime: "20 minutes",
//           price: "208",
//           image: "https://5.imimg.com/data5/SELLER/Default/2022/3/MG/GF/CF/16571218/tandoori-zinger-burger-500x500.PNG",
//         },
//         // Rest of the items...
//       ],
//     },

//     {
//       name: "A2B - Adyar Ananda Bhavan",
//       deliveryTime: "15-20 minutes",
//       image: "https://aabsweets.com/assets/img/logo-a2b.png",
//       items: [
//         {
//           name: "Mini Tiffen",
//           deliveryTime: "15 minutes",
//           price: "175",
//           image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
//         },
//         {
//           name: "Podi Dosai",
//           deliveryTime: "20 minutes",
//           price: "127",
//           image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/z8ls5ld66kep2rejtuim",
//         },
//         {
//           name: "Medhu Vadai",
//           deliveryTime: "20 minutes",
//           price: "60",
//           image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Medu_Vadas.JPG/375px-Medu_Vadas.JPG",
//         },
//        // Rest of the items...
//       ],
//     },
//     {
//         name: "Subway Restaurant",
//         deliveryTime: "20-35 minutes",
//         image: "https://1000logos.net/wp-content/uploads/2017/06/Subway-Logo-2002.png",
//         items: [
//           {
//             name: "Paneer Tikka Signature Wrap",
//             deliveryTime: "20 minutes",
//            price: "299",
//             image: "https://cdn.tarladalal.com/members/9306/big/big_paneer_tikka_wrap-4220.jpg",
//           },
//           {
//             name: "Aloo Patty Cheese Pull Sandwich",
//             deliveryTime: "30 minutes",
//             price: "259",
//             image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/50a6664c08beb7e26ca108ac3f2f9383",
//           },
//           // Rest of the items...
//         ],
//       },
//       {
//         name: "Shree Anandhaas",
//         deliveryTime: "30-40 minutes",
//         image: "https://opaldesignstudio.com/wp-content/uploads/2019/03/019-1002x480.jpg",
//         items: [
//           {
//             name: "Mushroom Pulao",
//             deliveryTime: "30 minutes",
//             price: "206",
//             image: "https://premasculinary.com/wp-content/uploads/2022/06/Mushroom-Pulao-Recipe-1-scaled.jpg",
//           },
//           {
//             name: "Chilly Parotta",
//             deliveryTime: "35 minutes",
//             price: "125",
//             image: "https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2019/02/Chilli-Parotta-3.jpg?w=683&ssl=1",
//           },
//           // Rest of the items...
//         ],
//       },
//     // Rest of the restaurants...
//   ]);

    useEffect(() => {
        axios.get('http://localhost:8080/restaurant/all')
            .then(response => {
                // console.log(response.data)
                setRestaurants(response.data)
            }).catch(error => { 
                console.log(error)
            })
            setSelectedRestaurant(null)
     
    }, [])
    
    const handleBack = () => { 
        setSelectedRestaurant(null)
    }

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantSelection = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };
  const handleAddToCart = (itemName) => {
    // Handle the logic for adding the item to the cart
    console.log(`Item "${itemName}" added to cart.`);
  };

  if (selectedRestaurant) {
    return (
        <div>
            <button onClick={handleBack} style={{ color:"white" }}>back</button>
        <h2 style={{ color:"white" }}>{selectedRestaurant.restaurantName}</h2>
        <div className="items-container">
          {selectedRestaurant.restaurantmenu.map((item, index) => (
            <div key={index} className="item-card" >
              <h4>{item.name}</h4>
                  {item.image && item.image.body && (
                          <img
                            src={`data:${item.image.headers['Content-Type'][0]};base64,${item.image.body}`}
                        alt={item.restaurantName}
                        className="item-image"
                        style={{ height: "200px", width: "200px" }}
                        />
                        )}
              <p style={{ color:"black" }}>Description: {item.description}</p>
              <p style={{ color:"black" }}>Price: {item.price}</p>
              <p style={{ color:"black" }}>Tags: {item.tags}</p>
              <button onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Top-Brand Restaurants</h2>
      <div className="restaurant-list-horizontal">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="restaurant-card"
            onClick={() => handleRestaurantSelection(restaurant)}
          >
                {restaurant.image && restaurant.image.body && (
                          <img
                            src={`data:${restaurant.image.headers['Content-Type'][0]};base64,${restaurant.image.body}`}
                        alt={restaurant.restaurantName}
                        className="restaurant-image"
                        style={{ width: "300px", height: "150px" }}
                          />
                        )}
            <div>
              <h3>{restaurant.restaurantName}</h3>
              <p>Loaction : {restaurant.restaurantLocation}</p>
              <p>Email id : {restaurant.restaurantEmail}</p>
              <p>Contact Number : {restaurant.restaurantContact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrandRestaurants;