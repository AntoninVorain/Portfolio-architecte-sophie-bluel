let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

/**
 * Remise a zéro du formulaire d'ajout
 */
export const resetAddworkForm = () => {
  cleanThumb();
  document.querySelector("#title").value = ``;
  document.querySelector("#category").value = ``;
  document.querySelector("#image").value = ``;
};

/**
 * Nettoyage de la thumbnail du formulaire d'ajout
 */
const cleanThumb = () => {
  localStorage.removeItem("tempWork");

  let noThumb = document.querySelector(".js-no-thumb");
  noThumb.style.display = "flex";

  let loadedImage = document.querySelector(".loaded-img");
  let imgThumb = document.querySelector(".js-thumb");
  loadedImage.style.display = "none";
  imgThumb.removeAttribute("src");
};

const stopPropagation = (e) => {
  e.stopPropagation();
};

const openModal = async (e) => {
  e.preventDefault();
  const target = e.target.getAttribute("href");
  modal = document.querySelector(target);
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0]?.focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelectorAll(".js-modal-close")?.forEach((element) => {
    element?.addEventListener("click", closeModal);
  });
  modal
    .querySelector(".js-modal-stop")
    ?.addEventListener("click", stopPropagation);
};

const closeModal = (e) => {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  resetAddworkForm();
  document
    .querySelector("button.add-picture-modal-link")
    .classList.add("disabled");
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelectorAll(".js-modal-close")?.forEach((element) => {
    element?.removeEventListener("click", closeModal);
  });
  modal
    .querySelector(".js-modal-stop")
    ?.removeEventListener("click", stopPropagation);
  const hideModal = () => {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    modal = null;
    document.querySelector(".modal-wrapper").classList.remove("slided");
  };
  modal.addEventListener("animationend", hideModal);
};

const focusInModal = (e) => {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

export { openModal, closeModal, focusInModal };