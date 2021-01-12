// Gallary
import galleryItems from "./gallery-items.js";

const addGalleryItem = (item) => {
  const galleryItemRef = document.createElement("li");
  galleryItemRef.classList.add("gallery__item");
  const galleryItemLinkRef = document.createElement("a");
  galleryItemLinkRef.classList.add("gallery__link");
  galleryItemLinkRef.setAttribute("href", item.original);
  const galleryItemImgRef = document.createElement("img");
  galleryItemImgRef.classList.add("gallery__image");
  galleryItemImgRef.setAttribute("src", item.preview);
  galleryItemImgRef.setAttribute("data-source", item.original);
  galleryItemImgRef.setAttribute("alt", item.description);

  galleryItemRef.appendChild(galleryItemLinkRef);
  galleryItemLinkRef.appendChild(galleryItemImgRef);

  return galleryItemRef;
};

const galleryRef = document.querySelector(".js-gallery");
const gallery = galleryItems.map((item) => addGalleryItem(item));
galleryRef.append(...gallery);

console.log(galleryRef);

// Modal
const openModalRef = document.querySelector(".js-lightbox");
const closeModalBtnRef = document.querySelector("[data-action=close-lightbox]");
const backdropRef = document.querySelector(".lightbox__overlay");
const originalImgRef = document.querySelector(".lightbox__image");

const openModal = (e) => {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  window.addEventListener("keydown", pressOnEsc);
  openModalRef.classList.add("is-open");
  e.preventDefault();
  openOriginalImg(e);
};
const closeModalBtn = () => {
  window.removeEventListener("keydown", pressOnEsc);
  openModalRef.classList.remove("is-open");
  closeOriginalImg();
};
const clickOnBackdrop = (e) => {
  if (e.target === e.currentTarget) {
    closeModalBtn();
  }
};
const pressOnEsc = (e) => {
  if (e.code === "Escape") {
    closeModalBtn();
  }
};
const openOriginalImg = (e) => {
  originalImgRef.src = e.target.dataset.source;
  originalImgRef.alt = e.target.alt;
};
const closeOriginalImg = () => {
  if (!openModalRef.classList.contains("is-open")) {
    originalImgRef.src = "";
    originalImgRef.alt = "";
  }
};

galleryRef.addEventListener("click", openModal);
closeModalBtnRef.addEventListener("click", closeModalBtn);
backdropRef.addEventListener("click", clickOnBackdrop);
