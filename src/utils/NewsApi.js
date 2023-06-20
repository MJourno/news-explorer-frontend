//contain a description of requests to the newsapi.org service
import { API_KEY, PROXY_URL, ARTICLE_AMOUNT} from "./constants";

const now = new Date();
const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  customFetch(url, headers) {
    return fetch(url, headers)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
  }

  getArticles(keyword) {
    return this.customFetch(`${this._baseUrl}?q=${keyword}&from=${weekAgo.toISOString()}&to=${now.toISOString()}&pageSize=${ARTICLE_AMOUNT}&apiKey=${API_KEY}`, {
      headers: this._headers,
        method: 'GET'
    }
  )
  .then((res) => res.articles);
  }
  
}

const newsApi  = new NewsApi({
  baseUrl: PROXY_URL,
  headers: { "Content-Type": "application/json" }
});

export default newsApi;