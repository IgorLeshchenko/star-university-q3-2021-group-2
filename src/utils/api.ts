import { API_URL } from './constants'

export const sendPostRequest = (url: string, bodyData: unknown) => {
  return fetch(`${API_URL}${url}`, {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .catch(console.log)
}
