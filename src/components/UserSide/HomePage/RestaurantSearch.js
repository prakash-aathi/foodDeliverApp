import React, { useState,useEffect } from "react";
import axios from "axios";
import TopBrandRestaurants from "./TopBrandRestaurants";
import "./Searchpage.css"; // Import the CSS file
import Header from "../../UserSide/NavBar/Header";

const RestaurantSearch = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  // const restaurants = [
  //   {
  //     name: "Restaurant A",
  //     location: "Location 1",
  //     image: "https://aabsweets.com/assets/img/logo-a2b.png",
  //     menuItems: [
  //       {
  //         name: "Item 1A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 8.99,
  //         cuisine: "Indian",
  //       },
  //       {
  //         name: "Item 2A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 9.99,
  //         cuisine: "Indian",
  //       },
  //       {
  //         name: "Item 3A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 7.99,
  //         cuisine: "Indian",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Restaurant B",
  //     location: "Location 2",
  //     image: "https://aabsweets.com/assets/img/logo-a2b.png",
  //     menuItems: [
  //       {
  //         name: "Item 1A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 8.99,
  //         cuisine: "Indian",
  //       },
  //       {
  //         name: "Item 2A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 9.99,
  //         cuisine: "Indian",
  //       },
  //       {
  //         name: "Item 3A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 7.99,
  //         cuisine: "Indian",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Restaurant C",
  //     location: "Location 1",
  //     image: "https://aabsweets.com/assets/img/logo-a2b.png",
  //     menuItems: [
  //       {
  //         name: "Item 1A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 8.99,
  //         cuisine: "Indian",
  //       },
  //       {
  //         name: "Item 2A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 9.99,
  //         cuisine: "Indian",
  //       },
  //       {
  //         name: "Item 3A",
  //         image: "https://media-cdn.tripadvisor.com/media/photo-s/12/d2/93/48/mini-tiffin.jpg",
  //         price: 7.99,
  //         cuisine: "Indian",
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    axios.get('http://localhost:8080/restaurant/all')
        .then(response => {
            console.log(response.data)
            setRestaurants(response.data)
        }).catch(error => { 
            console.log(error)
        })
 
}, [])

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleRestaurantFilterChange = (event) => {
    setRestaurantFilter(event.target.value);
  };

  const addToCart = (item) => {
    // Implement your addToCart logic here
    console.log("Added to cart:", item);
  };

  const handleSearchClick = () => {
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const locationMatch = restaurant.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());
      const restaurantMatch = restaurant.name
        .toLowerCase()
        .includes(restaurantFilter.toLowerCase());
      return locationMatch && restaurantMatch;
    });
    setFilteredRestaurants(filteredRestaurants);
    setSelectedRestaurant(null);
    setSearchClicked(true);
  };

  const handleRestaurantSelection = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const renderMenuItem = (item) => (
    <div className="horizontal">
      <div key={item.restaurantName} className="search-item-card">
        <h5>{item.name}</h5>
        <img src={item.image} alt={item.name} />
        <p>Cuisine: {item.cuisine}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <button onClick={() => addToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );

  const renderMenuItems = (menuItems) => (
    <div className="item-list">
      {menuItems.map(renderMenuItem)}
    </div>
  );

  const renderRestaurant = (restaurant) => (
    <div
      key={restaurant.restaurantName}
      className="search-restaurant-card"
      onClick={() => handleRestaurantSelection(restaurant)}
    >
      
      <img src={restaurant.image} alt={restaurant.name} />
      <div>
        <h3>{restaurant.name}</h3>
      </div>
    </div>
  );

  const renderRestaurants = (restaurantsToRender) => (
    <div className="restaurant-list">
      {restaurantsToRender.map(renderRestaurant)}
    </div>
  );

  let filteredRestaurantsContent = null;
  if (searchClicked) {
    if (selectedRestaurant) {
      const { name, image, menuItems } = selectedRestaurant;
      filteredRestaurantsContent = (
        <div>
          <h3>Selected Restaurant: {name}</h3>
          <img src={image} alt={name} />
          <h4>Menu tems</h4>
          {menuItems.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            <div>
              <h4>Menu Items</h4>
              {renderMenuItems(menuItems)}
            </div>
          )}
        </div>
      );
    } else if (filteredRestaurants.length === 0) {
      filteredRestaurantsContent = <p>No restaurants found.</p>;
    } else {
      filteredRestaurantsContent = renderRestaurants(filteredRestaurants);
    }
  } else {
    filteredRestaurantsContent = <TopBrandRestaurants />;
  }

  return (
    <div>

      <Header></Header>
     
      <div className="search-bar">
        <label>
         <input
            type="text"
            placeholder="search by location"
            value={locationFilter}
            onChange={handleLocationFilterChange}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="search by restaurant"
            value={restaurantFilter}
            onChange={handleRestaurantFilterChange}
          />
        </label>
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="content">
        {selectedRestaurant ? (
          <div>
            {selectedRestaurant.menuItems.length === 0 ? (
              <p>No menu items found.</p>
            ) : (
              <div >
                <h4 style={{ marginLeft: "50px" }}>Menu Items</h4>
                <div  >{renderMenuItems(selectedRestaurant.menuItems)}</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredRestaurantsContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantSearch;