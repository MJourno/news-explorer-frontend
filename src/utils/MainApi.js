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
  saveArticle(data, searchKeyword, jwt) {
    //get information from data
    const {
      title,
      description: text,
      publishedAt: date,
      url: link,
      urlToImage: image,
    } = data;
    console.log(data,"api check");
    //get source from data
    const source = data.source.name;
    //get keyword from first capitalized letter
    const keyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);

    return this.customFetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      })
    });
  }

  unsaveArticle(id, jwt) {
    return this.customFetch(`${this._baseUrl}/articles/${id}`, {
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