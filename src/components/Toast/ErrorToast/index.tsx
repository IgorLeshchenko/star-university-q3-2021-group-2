import { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_TITLE } from '../../../utils/constants'
import { toasterService } from '../ToastService'

export const toastError = (status: number, content: string = DEFAULT_ERROR_MESSAGE): void => {
  if (status >= 400) {
    toasterService.error({
      title: DEFAULT_ERROR_TITLE,
      content,
    })
  }
}
