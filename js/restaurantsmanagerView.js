class RestaurantsManagerView {
  constructor() {
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

  showCategories(categories) {
    if (this.centralzone.children.length > 0) {
      this.centralzone.children[0].remove();
    }
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row", "mx-auto", "text-center");
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="no__decoration bg__black my-3">Nuestras categorías</h1>`
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
