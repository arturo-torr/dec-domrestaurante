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

  showRandomDishes(dishes) {
    if (this.initzone.children.length > 0) {
      this.initzone.children[0].remove();
    }

    let randomDishes = this.getRandomDishes(dishes);

    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("row", "mx-auto", "text-center");
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="no__decoration bg__black my-3">Nuestros platos</h1>`
    );
    for (const dish of randomDishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 my-1">
          <a
            class="no__decoration"
            data-category="${dish.dish.name}"
            href="#dish-list"
          >
            <div>
              <img
                alt="${dish.dish.title}"
                src="${dish.dish.image}"
                class="img-fluid rounded mb-4"
              />
            </div>
            <div>
              <h3>${dish.dish.name}</h3>
              <div>${dish.dish.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    this.initzone.append(container);
  }

  showCategories(categories) {
    if (this.centralzone.children.length > 0) {
      this.centralzone.children[0].remove();
    }
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row", "mx-auto", "text-center");
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="no__decoration bg__black my-5">Nuestras categorías</h1>`
    );
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 bg__black">
          <a class="no__decoration" data-category="${category.category.name}" href="#category-list">
            <div class="cat-list-text">
              <h3>${category.category.name}</h3>
              <div>${category.category.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    this.centralzone.append(container);
  }

  showCategoriesInMenu(categories) {
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    div.insertAdjacentHTML(
      "beforeend",
      `
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navCats"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categorías
      </a>`
    );

    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-category="${category.category.name}"
            class="dropdown-item"
            href="#category-list"
          >
            ${category.category.name}
          </a>`
      );
    }
    div.append(container);
    this.menu.append(div);
  }
}

export default RestaurantsManagerView;
