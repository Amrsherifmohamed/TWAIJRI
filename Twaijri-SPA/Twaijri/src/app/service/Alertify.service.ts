import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { sweetAlertOptions } from "../Models/notification-sweetalert-options";

@Injectable({ providedIn: 'root' })
export class AlertifyService {

  sweetAlertOptions: SweetAlertOptions = {}

  error(title: string, message: string) {
    let html = `
    <div style="text-align: left; padding: 5px; padding-left: 15px;">
      <p style="font-weight: 500;color: #f27474; margin-bottom: 1px;">${title}</p>
      <p style="width: 100%;">${message}</p>
    </div>`;

    swal.fire({
      ...sweetAlertOptions,
      html: html,
      icon: 'error',
    });
  }

  info(title: string, message: string) {
    let html = `
    <div style="text-align: left; padding: 5px; padding-left: 15px;">
      <p style="font-weight: 500;color: #a2e1f6; margin-bottom: 1px;">${title}</p>
      <p style="width: 100%;">${message}</p>
    </div>`;

    swal.fire({
      ...sweetAlertOptions,
      html: html,
      icon: 'info',
    });
  }

  success(title: string, message: string) {
    let html = `
    <div style="text-align: left; padding: 5px; padding-left: 15px;">
      <p style="font-weight: 500;color: #28c76f; margin-bottom: 1px;">${title}</p>
      <p style="width: 100%;">${message}</p>
    </div>`;

    swal.fire({
      ...sweetAlertOptions,
      html: html,
      icon: 'success',
    });
  }

}
