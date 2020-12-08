const BASE_URL = 'http://localhost:3000';

function getResponseData(res) {
  console.log(res);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, email, password }),
})
  .then((res) => getResponseData(res))
  .then((res) => {
    console.log(res);
    return res;
  });
export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({ email, password }),
})
  .then(((res) => getResponseData(res)))
  .then((data) => {
    localStorage.setItem('jwt', data.token);
    return data;
  });

export const getUserInfo = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => getResponseData(res))
  .then((res) => {
    console.log(res);
    return res;
  });

export const getSavedArticles = () => fetch(`${BASE_URL}/articles`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  credentials: 'include',
})
  .then((res) => getResponseData(res))
  .then((res) => {
    console.log(res);
    return res;
  });

export const postArticle = (keyword, title, text, date, source, link, image) => fetch(`${BASE_URL}/articles`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  credentials: 'include',
  body: JSON.stringify({
    keyword, title, text, date, source, link, image,
  }),
})
  .then((res) => getResponseData(res))
  .then((res) => {
    console.log(res);
    return res;
  });

export const deleteArticle = (id) => fetch(`${BASE_URL}/articles/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  credentials: 'include',
})
  .then((res) => getResponseData(res))
  .then((res) => {
    console.log(res);
    return res;
  });
