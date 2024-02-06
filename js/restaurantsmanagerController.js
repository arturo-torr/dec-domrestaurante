// Importado de los módulos necesarios
import RestaurantsManager, {
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
// Se instanciarán aquí los objetos que nos hagan falta para una carga inicial de datos
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class RestaurantsManagerController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;

    this.onLoad();
    this.onInit();
    this[VIEW].bindInit(this.handleInit);
  }

  [LOAD_MANAGER_OBJECTS]() {
    // Creación de categorías
    const cat1 = this[MODEL].createCategory(
      "Primeros",
      RestaurantsManager.Category
    );
    cat1.description = "Platos seleccionados como primeros";

    const cat2 = this[MODEL].createCategory(
      "Segundos",
      RestaurantsManager.Category
    );
    cat2.description = "Platos seleccionados como segundos";

    const cat3 = this[MODEL].createCategory(
      "Postres",
      RestaurantsManager.Category
    );
    cat3.description = "Platos seleccionados como postres";

    // Creación de platos
    let dish1 = this[MODEL].createDish(
      "Patatas fritas",
      RestaurantsManager.Dish
    );
    dish1.ingredients = ["Patatas", "Sal"];
    dish1.description = "Patatas fritas realizadas con aceite de girasol";

    let dish2 = this[MODEL].createDish(
      "Lentejas con Arroz",
      RestaurantsManager.Dish
    );
    dish2.ingredients = [
      "Lentejas",
      "Arroz",
      "Tomate Frito",
      "Chorizo",
      "Laurel",
      "Pimienta",
      "Pimenton",
      "Patata",
      "Ajo",
      "Cebolla",
    ];
    dish2.description = "Comida tradicional para el invierno";

    let dish3 = this[MODEL].createDish(
      "Tortilla de Patatas",
      RestaurantsManager.Dish
    );
    dish3.ingredients = ["Patatas", "Sal", "Aceite", "Huevo"];
    dish3.description = "Comida campera por excelencia para tapa";

    let dish4 = this[MODEL].createDish(
      "Arroz con caldo",
      RestaurantsManager.Dish
    );
    dish4.ingredients = [
      "Ajo",
      "Cebolla",
      "Pimenton",
      "Colorante",
      "Pimienta",
      "Magro",
      "Pollo",
      "Arroz",
      "Tomate",
    ];
    dish4.description = "Comida de calidad para los domingos";

    let dish5 = this[MODEL].createDish(
      "Sopa de cocido",
      RestaurantsManager.Dish
    );
    dish5.ingredients = [
      "Patata",
      "Garbanzos",
      "Pollo",
      "Jamon",
      "Fideos",
      "Sal",
      "Colorante",
    ];
    dish5.description = "Comida excelente para el frío";

    let dish6 = this[MODEL].createDish(
      "Sopa de tomate",
      RestaurantsManager.Dish
    );
    dish6.ingredients = [
      "Tomate picado",
      "Pimentón dulce",
      "Agua",
      "Sal",
      "Pan",
    ];
    dish6.description = "Comida tradicional española";

    let dish7 = this[MODEL].createDish(
      "Sopa de picadillo",
      RestaurantsManager.Dish
    );
    dish7.ingredients = ["Pan", "Jamon", "Garbanzos", "Pollo", "Agua", "Sal"];
    dish7.description = "Comida reconfortante para reanudar la jornada";

    let dish8 = this[MODEL].createDish(
      "Bacalao al pilpil",
      RestaurantsManager.Dish
    );
    dish8.ingredients = [
      "Bacalao desalado",
      "Aceite de oliva",
      "Ajo",
      "Patatas",
      "Sal",
    ];
    dish8.description = "Excelente para los que prefieren el mar";

    let dish9 = this[MODEL].createDish(
      "Helado casero",
      RestaurantsManager.Dish
    );
    dish9.ingredients = ["Vainilla", "Azúcar", "Sirope de chocolate"];
    dish9.description = "Artesano y delicioso";

    let dish10 = this[MODEL].createDish("Contesa", RestaurantsManager.Dish);
    dish10.ingredients = ["Nata", "Chocolate", "Azúcar"];
    dish10.description = "Postre tradicional español";

    let dish11 = this[MODEL].createDish(
      "Natillas de la abuela",
      RestaurantsManager.Dish
    );
    dish11.ingredients = [
      "Leche",
      "Canela",
      "Vaina de vainilla",
      "Yema de huevo",
      "Azúcar",
      "Galleta",
    ];
    dish11.description = "Tradicional, casero y auténtico";

    let dish12 = this[MODEL].createDish(
      "Arroz con leche",
      RestaurantsManager.Dish
    );
    dish12.ingredients = [
      "Leche",
      "Azúcar",
      "Corteza de naranja",
      "Vainilla",
      "Arroz",
      "Canela",
    ];
    dish12.description = "Postre al estilo Karlos Arguiñano";

    // Creación de alérgenos
    let all1 = this[MODEL].createAllergen(
      "Lactosa",
      RestaurantsManager.Allergen
    );
    let all2 = this[MODEL].createAllergen(
      "Gluten",
      RestaurantsManager.Allergen
    );
    let all3 = this[MODEL].createAllergen("Soja", RestaurantsManager.Allergen);
    let all4 = this[MODEL].createAllergen(
      "Frutos Secos",
      RestaurantsManager.Allergen
    );

    this[MODEL].addAllergen(all1, all2, all3, all4);

    // Creación de menús
    let menu1 = this[MODEL].createMenu(
      "Menu del Miercoles",
      RestaurantsManager.Menu
    );
    let menu2 = this[MODEL].createMenu(
      "Menu del Jueves",
      RestaurantsManager.Menu
    );
    let menu3 = this[MODEL].createMenu(
      "Menu del Viernes",
      RestaurantsManager.Menu
    );

    // Asignación de platos a categorías y menús
    this[MODEL].assignCategoryToDish(cat1, dish2, dish3, dish4, dish5);
    this[MODEL].assignCategoryToDish(cat2, dish1, dish6, dish7, dish8);
    this[MODEL].assignCategoryToDish(cat3, dish9, dish10, dish11, dish12);

    this[MODEL].assignDishToMenu(menu1, dish2, dish1, dish9);
    this[MODEL].assignDishToMenu(menu2, dish3, dish6, dish10);
    this[MODEL].assignDishToMenu(menu3, dish4, dish7, dish11);

    // Creación de restaurantes
    let res1 = this[MODEL].createRestaurant(
      "Restaurante 1",
      RestaurantsManager.Restaurant
    );
    // Creación de restaurantes
    let res2 = this[MODEL].createRestaurant(
      "Restaurante 2",
      RestaurantsManager.Restaurant
    );
    // Creación de restaurantes
    let res3 = this[MODEL].createRestaurant(
      "Restaurante 3",
      RestaurantsManager.Restaurant
    );
    this[MODEL].addRestaurant(res1, res2, res3);
  }

  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
  };

  onInit = () => {
    this[VIEW].showCategories(this[MODEL].categories);
  };
  handleInit = () => {
    this.onInit();
  };
}

export default RestaurantsManagerController;
