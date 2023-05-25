const filters = document.querySelector(".filters")
let projects = [];
let categories = [];
async function getProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((projectsResponse) => {
      //console.log(projectsResponse);
      projects=projectsResponse
    })
    .catch((error) => console.log(error))
}

async function getCategories() {
  await fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
    .then((categoriesResponse) => {
      //console.log(categoriesResponse);
      categories = categoriesResponse;
    })
    .catch((error) => console.log(error))
}

// getProjects();
async function displayProjects() {
  await getProjects();
  let gallery = document.querySelector('.gallery');
  gallery.innerHTML = ``;
  for (const project of projects) {
    let figureElement = document.createElement('figure');
    figureElement.setAttribute("data-categoryId", project.categoryId)
    figureElement.setAttribute("class", "display")
    figureElement.innerHTML = `
            <img crossorigin="anonymous" src="${project.imageUrl}" alt="${project.title}">
            <figcaption>${project.title}</figcaption>`;
    gallery.appendChild(figureElement);
  }
}
displayProjects()

const tous = document.getElementById("tous")
tous.addEventListener("click", (e) => {
  let figures = document.querySelectorAll(".gallery figure")
  for (const figure of figures) {
    figure.classList.replace("hidden", "display")        
  }
})

async function displayCategories() {
  await getProjects()
  await getCategories()
  for (const category of categories) {
    let button = document.createElement("button")
    button.innerText = category.name
    filters.appendChild(button)
    // tous.appendChild(button)
    button.addEventListener("click", (e) => {
      let figures = document.querySelectorAll(".gallery figure")
      for (const figure of figures) {
        if (parseInt(figure.getAttribute("data-categoryId")) === category.id)
        {
          figure.classList.replace("hidden", "display")
        } else {
          figure.classList.replace("display", "hidden")
        }        
      }
    })
  }
}

displayCategories();