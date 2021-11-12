import React from 'react'
import ReactDOM from 'react-dom'

import { Toast, ToastProps } from './index'

interface ToastOptions {
  title: string
  content: string
  status?: 'check' | 'error' | 'info' | 'warning'
  duration?: number
  backgroundColor?: '#5cb85c' | '#d9534f' | '#5bc0de' | '#f0ad4e'
}
export class ToastService {
  private readonly containerRef: HTMLDivElement
  private toasts: ToastProps[] = []

  constructor() {
    const body = document.getElementById('root') as HTMLDivElement
    const toastContainer = document.createElement('div') as HTMLDivElement
    toastContainer.id = 'toast-container-main'
    body?.insertAdjacentElement('beforebegin', toastContainer)
    this.containerRef = toastContainer
  }

  private show(options: ToastOptions): void {
    const toastId = Math.random().toString(36).substr(2, 7)
    const toast: ToastProps = {
      id: toastId,
      ...options,
      destroy: () => this.destroy(toastId),
    }
    this.toasts = [toast, ...this.toasts]
    this.render()
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id)
    this.render()
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps) => <Toast key={toastProps.id} {...toastProps} />)
    ReactDOM.render(toastsList, this.containerRef)
  }

  public success(options: ToastOptions): void {
    this.show({ ...options, status: 'check', backgroundColor: '#5cb85c' })
  }

  public error(options: ToastOptions): void {
    this.show({ ...options, status: 'error', backgroundColor: '#d9534f' })
  }

  public info(options: ToastOptions): void {
    this.show({ ...options, status: 'info', backgroundColor: '#5bc0de' })
  }

  public warning(options: ToastOptions): void {
    this.show({ ...options, status: 'warning', backgroundColor: '#f0ad4e' })
  }
}

export const toasterService = new ToastService()
