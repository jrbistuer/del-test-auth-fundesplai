import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../model/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../shared/components/dialog-success/dialog-success.component';
import { UserFormDialogComponent } from '../../shared/components/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  @ViewChild('formDirective') private formDirective!: FormGroupDirective;

  userForm!: FormGroup;
  users$!: Observable<IUser[]>;
  displayedColumns: string[] = ['US_Id', 'US_Nom', 'US_Cognoms', 'US_Email', 'US_Status'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.createForm();
  }

  getUsers() {
    this.users$ = this.userService.getUsers()
  }

  createForm() {
    this.userForm = this.fb.group({
      US_Nom: ['', [Validators.required]],
      US_Cognoms: ['', [Validators.required]],
      US_Email: ['', [Validators.required, Validators.email]]
    });
  }
  
  get f() {
    return this.userForm.controls;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  openUserForm() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(() => {
          this.getUsers();
          this.dialog.open(DialogSuccessComponent, {
            width: '350px',
            data: {
              title: 'Éxito',
              message: 'El usuario se ha registrado correctamente.'
            }
          });
        });
      }
    });
  }

}
