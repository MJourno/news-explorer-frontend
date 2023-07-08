//a description of requests to our API
import { BASE_URL } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error in response from the server: ${res.status}`)
    }
  }

  customFetch(url, headers) {
    return fetch(url, headers)
      .then(this.getResponseData);
  }

  getCurrentUser(jwt) {
    return this.customFetch(`${this._baseUrl}/user/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
  }

  getSavedArticles(jwt) {
    return this.customFetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
  }

  createNewArticle(articleData, jwt) {
    return this.customFetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

  }
  saveArticle(articleId, jwt) {
    return this.customFetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
  }

  unsaveArticle(articleId, jwt) {
    return this.customFetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
});

export default mainApi;