//получить доступ
const contentElement = document.querySelector('.content');
const contentBtn = contentElement.querySelector('.content__button');
const partnerPopup = document.querySelector('.popup');
const cancelBtn = partnerPopup.querySelector('.popup__cancel-btn');
const logoPopupField = partnerPopup.querySelector('.popup__logo-field');
const logoPopupSpan = partnerPopup.querySelector('.popup__logo-span');

//функция открития попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//открыть попап по кнопке
contentBtn.addEventListener('click', () => {
  openPopup(partnerPopup);
});
//закрыть попап по кнопке
cancelBtn.addEventListener('click', () => {
  closePopup(partnerPopup);
});
//уведомление о выборе файла лого
logoPopupField.addEventListener('change', (evt) => {
  if (evt.type === 'change') {
    logoPopupSpan.textContent = 'Файл выбран';
  }
});
