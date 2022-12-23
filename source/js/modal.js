const hotelSearchButton = document.querySelector('.hotel-search-button');
const modalContainer = document.querySelector('.modal-container');
const modalCloseButton = document.querySelector('.modal-close-button');
const isEscapeKey = (evt) => evt.key === 'Escape';

function openModal () {
  modalContainer.classList.remove('madal-closed')
}

function closeModal () {
  modalContainer.classList.add('madal-closed');
  window.scrollTo(0, 2100);
}

function closeModalOnEscape (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

if (modalContainer) {
  document.addEventListener('keydown', closeModalOnEscape);
  hotelSearchButton.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click',closeModal)
}
