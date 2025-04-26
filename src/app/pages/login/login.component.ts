import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){
    this.loginForm = this.fb.group({
      userEmail: [''],
      userPassword: ['']
    });
  }

  onSubmit() {
    const { userEmail, userPassword } = this.loginForm.value;

    this.authService
        .tryLogin({ userEmail: userEmail, userPassword: userPassword })
        .subscribe({
            next: (response) => {
                localStorage.setItem('access_token', response.token);
                localStorage.setItem('user_id', response.userId);
                this.router.navigate(['/home/contact-list']);
            },
            error: (error) => {
                if (!userEmail || !userPassword) {
                  this.toastr.error('Nenhum dos campos deve estar vazio.', 'Atenção!');
                } else {
                  this.toastr.error('Usuário e/ou senha incorreto!');
                }
            }
    });
}

}
