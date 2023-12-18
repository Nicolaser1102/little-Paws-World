import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject (Router);

  public myForm: FormGroup = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]],
  })


  registrarUsuario(){
    const {name, email, password } = this.myForm.value;

    this.authService.registrarUsuario(name, email, password)
    .subscribe( {
      next: () =>{
        Swal.fire({
          title: "Cuenta registrada con éxito!",
          text: "Ya puedes iniciar sesión",
          icon: "success"
        });
        this.router.navigateByUrl('/login')
      },
      error: (errorMessage) => {
        this.router.navigateByUrl('/login')
        Swal.fire('Error' , errorMessage, 'error' )
      }
    } )
  }



}
