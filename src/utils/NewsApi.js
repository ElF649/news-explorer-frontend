const BASE_URL = 'https://nomoreparties.co/news/v2/everything';

const API_KEY = '7834d497a7114eef8ac8fefab6404d9b';

const TODAY = new Intl.DateTimeFormat('sv', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());

const ONE_WEEK_AGO = TODAY - 6048e5;

const PAGE_SIZE = '100';

export const getArticlesFromNewsApi = (request) => {
  const URL = `${BASE_URL}?`
    + `q=${request}&`
    + `apiKey=${API_KEY}&`
    + `from=${ONE_WEEK_AGO}&`
    + `to=${TODAY}&`
    + `pageSize=${PAGE_SIZE}`;

  return fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
};
