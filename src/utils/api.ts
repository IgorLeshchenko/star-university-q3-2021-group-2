import { API_URL } from './constants'
import { CONTENT_TYPE } from './enums'

export interface IRequestData {
  status: number
  ok: boolean
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  body: any
}

const returnSuccessRequestData = async (response: Response): Promise<IRequestData> => {
  const result = (response.headers.get('content-type') || '').includes(CONTENT_TYPE.APPLICATION_JSON)
    ? await response.json()
    : null
  return {
    status: response.status,
    ok: response.ok,
    body: result,
  }
}

export const sendPostRequest = (url: string, bodyData: unknown): Promise<IRequestData> => {
  return fetch(`${API_URL}${url}`, {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': CONTENT_TYPE.APPLICATION_JSON,
    },
  })
    .then((resp) => returnSuccessRequestData(resp))
    .catch(() => ({
      status: 500,
      ok: false,
      body: null,
    }))
}
