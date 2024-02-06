class RestaurantsManagerView {
  constructor() {
    this.centralzone = document.getElementById("central_zone");
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
    if (this.centralzone.children.length > 1)
      this.centralzone.children[1].remove();
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4">
          <a data-category="${category.category.name}" href="#product-list">
            <div class="cat-list-image">
              <img alt="${category.category.name}" />
            </div>
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
}

export default RestaurantsManagerView;
