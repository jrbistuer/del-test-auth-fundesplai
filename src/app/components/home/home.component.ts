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
import { MatIconModule } from '@angular/material/icon';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { IPedido } from '../../../model/pedido.model';
import { PedidosService } from '../../services/pedidos.service';

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
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  @ViewChild('formDirective') private formDirective!: FormGroupDirective;

  userForm!: FormGroup;
  users$!: Observable<IUser[]>;
  pedidos$!: Observable<IPedido[]>;
  displayedColumns: string[] = ['US_Id', 'US_Nom', 'US_Cognoms', 'US_Email', 'US_Status', 'acciones'];
  displayedPedidosColumns: string[] = ['PED_Id', 'PED_Nombre', 'PED_Descripcion', 'PED_Precio', 'PED_Status', 'acciones'];


  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    private pedidosService: PedidosService,
    private dialog: MatDialog
  ) {
    this.getUsers();
    this.getPedidos();
  }

  ngOnInit(): void {
    this.createForm();
  }

  getUsers() {
    this.users$ = this.userService.getUsers()
  }

  getPedidos() {
    this.pedidos$ = this.pedidosService.getPedidos();
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

  openUserForm(user?: IUser) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: {
        user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          this.userService.updateUser(result).subscribe(() => {
            this.getUsers();
            this.dialog.open(DialogSuccessComponent, {
              width: '350px',
              data: {
                title: 'Éxito',
                message: 'El usuario se ha registrado correctamente.'
              }
            });
          })
        } else {
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
      }
    });
  }

  editUser(user: IUser) {
    const u: IUser = {
      US_Id: user.US_Id,
      US_Id_Session: user.US_Id_Session,
      US_Nom: user.US_Nom,
      US_Cognoms: user.US_Cognoms,
      US_Email: user.US_Email
    }
    this.openUserForm(u);
  }

  deleteUser(user: IUser): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Seguro que deseas eliminar a ${user.US_Nom} ${user.US_Cognoms}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // lógica de eliminación real aquí
        console.log('Eliminando:', user);
        this.userService.deleteUser(user.US_Id!).subscribe(() => {
          this.getUsers();
        });
      }
    });
  }

}
