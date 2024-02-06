import RestaurantsManager from "./restaurantsmanager";
import RestaurantsManagerController from "./restaurantsManagerController";
import RestaurantsManagerView from "./restaurantsManagerView";

const RestaurantManagerApp = new RestaurantsManagerController(
  RestaurantsManager.getInstance(),
  new RestaurantsManagerView()
);

export default RestaurantManagerApp;
