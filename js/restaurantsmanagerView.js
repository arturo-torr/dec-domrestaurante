class RestaurantsManagerView {
  constructor() {
    this.initzone = document.getElementById("init_zone");
    this.centralzone = document.getElementById("central_zone");
    this.menu = document.querySelector(".navbar");
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      handler();
    });
  }

  // Función que permite obtener aleatoriamente 3 platos del iterador de restaurant manager
  getRandomDishes(dishes) {
    // Se genera un array con el iterador de platos
    let allDishes = [...dishes];
    // Creamos un array vacío que posteriormente devolveremos
    let randomDishes = [];
    // Variable para comprobar si puede salir del bucle
    let completed = false;

    for (let i = 0; !completed; i++) {
      // Obtenemos un índice aleatorio entre 0 y la longitud de allDishes
      let index = Math.floor(Math.random() * allDishes.length);

      // Variable utilizada para ver si el plato ya se encuentra en el array que devolveremos, evitando así que se muestren platos duplicados
      let found = randomDishes.find(
        (x) => x.dish.name === allDishes[index].dish.name
      );

      // Si no se encuentra, lo introduce en el array
      if (!found) randomDishes.push(allDishes[index]);

      // Cuando la longitud es 3, sale del bucle
      if (randomDishes.length === 3) completed = true;
    }

    return randomDishes;
  }

  // Función que permite visualizar platos en la zona inicial del HTML
  showRandomDishes(dishes) {
    if (this.initzone.children.length > 0) {
      this.initzone.children[0].remove();
    }

    // Obtenemos tres platos aleatorios
    let randomDishes = this.getRandomDishes(dishes);

    // Creamos un nuevo div y le asignamos un id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "random-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Dentro del div ponemos una cabecera
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black my-3">Nuestros platos</h1>`
    );
    // Recorremos el array con los tres platos y le damos el formato necesario
    for (const dish of randomDishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 my-1">
          <a
            class="text--green"
            data-name="${dish.dish.name}"
            href="#single-dish">
            <div>
              <img
                alt="${dish.dish.title}"
                src="${dish.dish.image}"
                class="img-fluid rounded mb-4">
            </div>
            <div>
              <h3>${dish.dish.name}</h3>
              <div>${dish.dish.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Insertamos el contenedor con el formato de platos en el html
    this.initzone.append(container);
  }

  // Manejador que se da cuando se realiza click en la zona con los platos aleatorios
  bindDishesRandomList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const randomList = document.getElementById("random-list");
    const links = randomList.querySelectorAll("a");
    // Los recorre y recupera el nombre del plato con el atributo personalizado dataset.name
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Permite unir con el controlador el plato, añadiendo un manejador de eventos para cada plato
  bindShowDish(handler) {
    const dishList = document.getElementById("dish-list");
    const links = dishList.querySelectorAll("a.text--green");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
    const images = categoryList.querySelectorAll("figcaption a");
    for (const image of images) {
      image.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Función que permite imprimir en el HTML las categorías
  showCategories(categories) {
    if (this.centralzone.children.length > 0) {
      this.centralzone.children[0].remove();
    }

    // Crea un elemento div, se le asigna un id y las clases necesarias
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Se inserta una cabecera dentro del div creado
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black mt-5">Nuestras categorías</h1>`
    );
    // Recorremos las categorías y le damos un formato visible para el HTML
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 bg__black my-5">
          <a class="text--green" data-category="${category.category.name}" href="#dish-list">
            <div class="border--green rounded p-3">
              <h3>${category.category.name}</h3>
              <div>${category.category.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Inserta en el HTML el contenedor que hemos creado
    this.centralzone.append(container);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con las categorías
  showCategoriesInMenu(categories) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle"
        href="#"
        id="navCats"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Categorías
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos las categorías y se insertarán dentro del desplegable
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-category="${category.category.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${category.category.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los alérgenos
  showAllergensInMenu(allergens) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle"
        href="#"
        id="navAllergens"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Alérgenos
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los alérgenos y se insertarán dentro del desplegable
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-allergen="${allergen.allergen.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${allergen.allergen.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de alérgenos
  bindDishesAllergenListInMenu(handler) {
    // Obtiene el elemento de navCats y recoge el siguiente hermano con el tag <a>
    const navAllergens = document.getElementById("navAllergens");
    const links = navAllergens.nextSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado data-allergen
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.allergen);
      });
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los menús registrados
  showMenusInNav(menus) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle"
        href="#"
        id="navMenus"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Menús
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los alérgenos y se insertarán dentro del desplegable
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-menu="${menu.menu.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${menu.menu.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de menús
  bindMenuListInNav(handler) {
    // Obtiene el elemento de navCats y recoge el siguiente hermano con el tag <a>
    const navMenus = document.getElementById("navMenus");
    const links = navMenus.nextSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado data-allergen
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.menu);
      });
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los restaurantes registrados
  showRestaurantsInMenu(restaurants) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle"
        href="#"
        id="navRests"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Restaurantes
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los restaurantes y se insertarán dentro del desplegable
    for (const rest of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-rest="${rest.restaurant.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${rest.restaurant.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de menús
  bindRestaurantListInMenu(handler) {
    // Obtiene el elemento de navRests y recoge el siguiente hermano con el tag <a>
    const navRests = document.getElementById("navRests");
    const links = navRests.nextSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado data-allergen
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.rest);
      });
    }
  }

  // Función que permite listar los platos de una categoría
  listDishes(dishes, title) {
    // Borra la zona central
    this.centralzone.replaceChildren();

    // Crea un elemento, le asigna el id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("container", "my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    // Recorremos el array de platos
    for (const dish of dishes) {
      // Se crea un nuevo div, le damos formato con los platos
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card bg__black">
            <a data-name="${dish.dish.name}" href="#single-dish" class="text--green text-center">
              <img class="img-fluid" src="${dish.dish.image}">
              <figcaption class="my-3">${dish.dish.name}</figcaption>
            </a>
        </figure>`
      );
      // Insertamos el div creado
      container.children[0].append(div);
    }
    // Le da una cabecera justo al principio indicando el nombre de la categoría
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="text--green my-3">${title}</h1>`
    );
    this.centralzone.append(container);
  }

  // Manejador que se da cuando se realiza click en la zona central de categorías
  bindDishesCategoryList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const categoryList = document.getElementById("dish-list");
    const links = categoryList.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // Manejador que se da cuando se realiza click en la zona de navegación de categorías
  bindDishesCategoryListInMenu(handler) {
    // Obtiene el elemento de navCats y recoge el siguiente hermano con el tag <a>
    const navCats = document.getElementById("navCats");
    const links = navCats.nextSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada plato
  showDish(dish, message) {
    this.centralzone.replaceChildren();
    if (this.centralzone.children.length > 1)
      this.centralzone.children[1].remove();

    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (dish) {
      container.id = "single-dish";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-6">
                  <div class="text-center p-4">
                    <img class="img-fluid rounded" src="${dish.image}" />
                  </div>
                </div>
                <div class="col-xl-6 text-center">
                  <div class="p-4">
                    <div class="mt-4 mb-3">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">${dish.name}</h2>
                    </div>
                    <div class="mt-4 mb-3">
                      <h6 class="text-uppercase text--green fw-bold">Ingredientes</h6>
                      <p class="text--green">${dish.stringIngredients}</p>
                    </div>
                    <div class="mt-5">
                      <h6 class="text-uppercase text--green fw-bold">Descripción</h6>
                      <p class="text--green">${dish.description}</p>
                    </div>
                    <div class="cart mt-4 align-items-center">
                      <button
                        data-name="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Descubrir ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Si no se encuentra el plato, lanza un mensaje de error
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center text--green">${message}</div>`
      );
    }
    this.centralzone.append(container);
  }
}

export default RestaurantsManagerView;
