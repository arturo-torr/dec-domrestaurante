// Importado de los módulos necesarios
import {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from "./restaurantsmanager.js";

// Modelo y vista como constantes privadas
const MODEL = Symbol("RestaurantsManagerModel");
const VIEW = Symbol("RestaurantsManagerView");

class RestaurantsManagerController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;
  }
}

export default RestaurantsManagerController;
