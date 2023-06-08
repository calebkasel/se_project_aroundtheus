export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscDown = this._handleEscClose.bind(this);
  }

  open() {
    //opens modal
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscDown);
  }

  close() {
    //closes modal
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscDown);
  }

  _handleEscClose(evt) {
    //listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    //listens for events
    this._modalElement.closest(".modal").addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
