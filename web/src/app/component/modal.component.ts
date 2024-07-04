import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  isOpen = false;
  hasNoFooter = false;
  isDanger = false;
  modalSize = '';
}
