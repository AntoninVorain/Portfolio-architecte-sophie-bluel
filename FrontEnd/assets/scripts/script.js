let projects = [];
async function getProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((projectsResponse) => {
      console.log(projectsResponse);
      projects=projectsResponse
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
    figureElement.innerHTML = `
            <img crossorigin="anonymous" src="${project.imageUrl}" alt="${project.title}">
            <figcaption>${project.title}</figcaption>`;
    gallery.appendChild(figureElement);
  }
}
displayProjects()