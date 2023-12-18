import { Component, Input, inject } from '@angular/core';
import { NombrePaquete } from '../../interfaces/paquete.enum';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces';
import { Pedido } from '../../interfaces/Pedido.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  private fb          = inject(FormBuilder);
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);

  public mostrarForm: boolean = false;
  public mostrarPaquetes: boolean = true;
  public paquete: NombrePaquete = NombrePaquete.miMimado;

  get getPaquete(): NombrePaquete {
    return this.paquete;
  }


  @Input()
  public user!: User | null;


  public pedidoForm: FormGroup = this.fb.group({
    nombreMascotas: ['', [Validators.required, Validators.minLength(4)]],
    direccion : ['', [Validators.required, Validators.minLength(8)]],
  })


  onMiMimadoPaquete(){
    this.paquete = NombrePaquete.miMimado;
    this.mostrarForm = true;
    this.mostrarPaquetes = false;
  }


  onFamiliaPatitas(){
    this.paquete = NombrePaquete.familiaPatitas;
    this.mostrarForm = true;
    this.mostrarPaquetes = false;
  }


  onPeluditosEjecutivos(){
    Swal.fire({
      title: "Recibido!",
      text: "Tu petición se ha recibido te contactaremos por correo electrónico lo antes posible",
      icon: "success"
    });
  }

  crearForm(){

  }

  cancelarCompra(){
    this.mostrarForm = false;
    this.pedidoForm.reset();
  }


  registrarPedido(){
    console.log("Pedido registrado")
    console.log(this.pedidoForm.value)
    console.log(this.getPaquete);

    const pedido: Pedido = {
      nombreMascota: this.pedidoForm.get('nombreMascotas')?.value,
      direccion: this.pedidoForm.get('direccion')?.value,
      paquete: this.getPaquete,
      id_user: this.user!._id
    }

    this.dashboardService.registarPedido(pedido).subscribe(

      {
        next: () =>{
          Swal.fire({
            title: "Compra hecha con éxito!",
            text: "Un asesor se contactará contigo pronto",
            icon: "success"
          });
        },
        error: (errorMessage) => {

          // Swal.fire('Error' , 'Ya tienes comprado un paquete', 'error', )
          Swal.fire({
            icon: 'error',
            title: 'Ya tienes comprado un paquete',
            text: 'Deseas eliminar la compra?',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Eliminar`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
              Swal.fire("Registro eliminado");
              this.dashboardService.eliminarPedido(this.user!._id).subscribe(
                result => {
                  console.log('Estoy suscribiendome para eliminar');
                }
              ) ;
            }
          })


        }
      }

      // pedido =>{
      //   console.log("Pedido registrado")
      //   console.log(pedido)
      // }
    );


  }





  onLogOut(){
    this.authService.logout();
  }


}
