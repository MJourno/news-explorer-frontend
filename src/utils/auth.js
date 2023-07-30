import { BASE_URL } from "./constants";

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error in response from the server: ${res.status}`)
  }
}
//signup
export function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => {
      return getResponseData(res)}
    ).catch((err) => {
      console.log(err);
    })
};
//signin
export function authorize({email , password}) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 'email': email, password }),
  })
    .then((res) =>
      getResponseData(res, 'Unsuccessful log in')
    )
    .then((data) => {
      if(data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return;
      }
    })
};
//check user-token
export function getContent(jwt) {

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return getResponseData(res)
  });
}
