import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})

export class ChangePasswordComponent {

  cgForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.cgForm = this.fb.group({
      userPassword: [''],
      userNewPassword: ['']
    })
  }

  changePwd(){
    const formValue = this.cgForm.value;

    const user = {
      userPassword: formValue.userPassword?.trim() === '' ? null : formValue.userPassword,
      userNewPassword: formValue.userNewPassword?.trim() === '' ? null : formValue.userNewPassword
    };

    this.userService
        .changeUserPassword(user)
        .subscribe({
          next: (response) => {
            this.toastr.success('Senha alterada com sucesso');
            this.cgForm.reset();
          },
          error: (error) => {
            if(formValue.userPassword === '' || formValue.userNewPassword === ''){
              this.toastr.error(error.error.error);
            } else {
              this.toastr.error(error.error.message);
            }
          }
    })
  }
}
