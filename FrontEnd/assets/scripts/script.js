import { API_URL, AUTHORIZED_TYPE } from "./Constantes.js";
import { SessionManager } from "./SessionManager.js";

const filters = document.querySelector(".filters")
let projects = [];
let categories = [];

(async () => {
  let works = new Set(await fetch(`${API_URL}/works`).then(response => response.json()))
  SessionManager().refreshHUD(works);
//   updateCategories(works)
//   changeArrayForFilter(works, {id: 0})

  if (SessionManager().isAuthenticated()) {
      
      
      const addWork = async (e) => {
          clearFormErrors()
          e.preventDefault()
    
          const image = e.target.image.files[0]
          const title = e.target.title.value
          const category = parseInt(e.target.category.value)

          const data = {
              image: image,
              title: title,
              category: category
          }

          const formData = new FormData()
          formData.append('image', data.image)
          formData.append('title', data.title)
          formData.append('category', data.category)
          formData.forEach((e) => e === undefined ? appendsFormError(`${e} est requis<br>`) : '')
      
          await fetch(`${API_URL}/works`, {
              method: 'POST',
              headers: {
                  "accept": "*/*",
                  "Authorization": `Bearer ${SessionManager().getToken()}`
              },
              body: formData
          })
          
      }
}
})();

async function getProjects() {
  await fetch(`${API_URL}/works`)
    .then((response) => response.json())
    .then((projectsResponse) => {
      //console.log(projectsResponse);
      projects=projectsResponse
    })
    .catch((error) => console.log(error))
}

async function getCategories() {
  await fetch(`${API_URL}/categories`)
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
tous.classList.add("button.active")  
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
    button.addEventListener("click", (e) => {
      button.classList.add("button.active")
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