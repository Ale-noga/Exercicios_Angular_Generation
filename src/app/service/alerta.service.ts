import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AlertaComponent } from '../alerta/alerta.component';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(
    private bsModalService: BsModalService
  ) { }

    private showAlert(msg: string, tipo: string){
      const bsModalRef: BsModalRef = this.bsModalService.show(AlertaComponent)
      bsModalRef.content.type = tipo
      bsModalRef.content.message = msg
    }

    showAlertDanger(msg: string){
      this.showAlert(msg, 'danger')
    }

    showAlertSuccess(msg: string){
      this.showAlert(msg, 'success')
    }

    showAlertInfo(msg: string){
      this.showAlert(msg, 'info')
    }
}
