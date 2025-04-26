import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  registerForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
        private toastr: ToastrService
  ){
    this.registerForm = this.fb.group({
      userEmail: [''],
      userPassword: ['']
    })
  }

  signUp() {
    const formValue = this.registerForm.value;

    const user = {
      userEmail: formValue.userEmail?.trim() === '' ? null : formValue.userEmail,
      userPassword: formValue.userPassword?.trim() === '' ? null : formValue.userPassword
    };

    this.authService
        .insert(user)
        .subscribe({
          next: (response) => {
            this.toastr.success('Cadastro realizado com sucesso', 'Parabéns!');
            this.registerForm.reset();
            this.router.navigate(['/login']);
          },
          error: (error) => {
            if(formValue.userEmail === '' || formValue.userPassword === ''){
              this.toastr.error(error.error.error);
            } else {
              this.toastr.error(error.error.message);
            }
          }
        })
  }

}
