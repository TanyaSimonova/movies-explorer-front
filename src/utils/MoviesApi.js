class Api {
  constructor(options, token) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _chekValidity(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getItems = () => {
    return fetch(`${this._url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this._chekValidity);
  };
}

const api = new Api({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
