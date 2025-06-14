import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../../../model/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogActions
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: IUser }
  ) {
    console.log(data?.user);
    this.userForm = this.fb.group({
      US_Nom: [data?.user?.US_Nom ?? null, Validators.required],
      US_Cognoms: [data?.user?.US_Cognoms ?? null, Validators.required],
      US_Email: [data?.user?.US_Email ?? null, [Validators.required, Validators.email]],
    });
    if (data?.user) {
      console.log(data.user);      
      this.userForm.markAllAsTouched();
    }
  }

  get f() {
    return this.userForm.controls;
  }

  onSave() {
    if (this.userForm.valid) {
      const u: IUser = {
        ...this.userForm.value,
      }
      if (this.data?.user) {
        u.US_Id = this.data.user.US_Id;
        console.log("u for update", u);
      }    
      this.dialogRef.close(u);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
