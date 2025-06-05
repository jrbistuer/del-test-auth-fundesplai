import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success',
  imports: [MatDialogModule],
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss']
})
export class DialogSuccessComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}

}
