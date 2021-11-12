import { toasterService } from './../components/Toast/ToastService'

export const handleError = (status: number, message: string) => {
  if (status >= 400) {
    toasterService.error({
      title: 'Error',
      content: message,
    })
  }
}
