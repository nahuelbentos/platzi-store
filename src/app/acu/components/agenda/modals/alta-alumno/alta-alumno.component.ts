import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AcuService } from '@acu/services/acu.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
import { SeleccionarSocioComponent } from '@acu/components/mercadopago/modals/seleccionar-socio/seleccionar-socio.component';

@Component({
  selector: 'app-alta-alumno',
  templateUrl: './alta-alumno.component.html',
  styleUrls: ['./alta-alumno.component.scss']
})
export class AltaAlumnoComponent {
  socId: number;

  socio: any;

  depId: number;
  locId: number;

  alumnoForm = this.fb.group({
    aluNro: null,
    aluNom: [null, Validators.required],
    aluApe1: [null, Validators.required],
    aluCi: [null, Validators.required],
    aluDV: [null, Validators.required],
    aluFchNac: [null, Validators.required],
    aluTel1: [null, Validators.required],
    aluTel2: [null, Validators.required],
    aluDepId: [null, Validators.required],
    aluLocId: [null, Validators.required],
    aluDir: [null],
    aluMail: [null, [
      Validators.required,
      Validators.email,
    ]],
    aluConNom: [null],
    aluConTel: [null],
    aluConPar: [null],
    socId: [null],
    socNom1: [null],
    socApe1: [null],
    socApe2: [null],
    socUltimoPago: [null],
    cantPres: [null],
    aluPar: [null],
  });

  parentescos = [
    { value: 'HIJO', description: 'HIJO' },
    { value: 'CÓNYUGE', description: 'CÓNYUGE' },
  ];

  hasUnitNumber = false;

  departamentos: Departamento[] = [];

  localidades: Localidad[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    public dialog: MatDialog,
    private acuService: AcuService,
    private fb: FormBuilder) {

    acuService.getDepartamentos()
      .subscribe((res: any) => {
        console.log('SDTDepartamento: ', res);
        this.departamentos = res.Departamentos;
      });
  }


  guardarAlumno(event: Event) {
    event.preventDefault();
    alert('Thanks!');

    // console.log('Submit, form valid: ', this.form.valid);
    // console.log('Submit, form value: ', this.form.value);
    // console.log('Submit, form value.cursoId: ', this.form.value.cursoId);

    // const existe: boolean = JSON.parse(localStorage.getItem('existe'));

    // if (this.form.valid) {
    //   console.log('form.value: ', this.form.value);
    //   console.log('this.inscripcionCurso: ', this.inscripcionCurso);
    //   this.acuService.guardarAgendaInstructor(this.inscripcionCurso)
    //     .subscribe((res: any) => {
    //       console.log('res: ', res);
    //       console.log('mensaje: ', res.mensaje);
    //       this.inscripcionCurso.mensaje = res.mensaje;
    //     });


    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  seleccionarSocio(parametro) {
    console.log('1)tipo: FREE');
    console.log('2)parametro: ', parametro);


    this.acuService.getSocios(100, 1, 'FREE', parametro)
      .subscribe((res: any) => {
        console.log('3) res.socios22: ', res);

        //  socios = res.Socios;
        this.openDialogSocios(res.Socios, res.Cantidad, 'FREE', parametro);
        // localStorage.setItem('Socios', JSON.stringify(socios));
      });

  }

  getLocalidades(depId) {
    this.localidades = this.departamentos.find((depto: any) => depto.DepId === depId).Localidades;
  }

  obtenerSocio(socioId) {
    this.acuService.getSocio(socioId)
      .subscribe((result: any) => {
        console.log('result: ', result);

        if (result) {
          this.socio = result;
          // this.socId = result.SocId;
          const socUltimoPago = `${result.SocMesPgo}/${result.SocAnoPgo}`;
          this.alumnoForm.patchValue({
            // socId: result.SocId,
            socNom1: result.SocNom1,
            socApe1: result.SocApe1,
            socApe2: result.SocApe2,
            socUltimoPago,
            cantPres: result.CantPres
          });

        }
      });
  }

  private openDialogSocios(socios, cantidad, tipo, filtro) {
    const sociosDialogRef = this.dialog.open(SeleccionarSocioComponent, {
      height: 'auto',
      width: '700px',
      data: {
        filtro,
        tipo,
        cantidad,
        socios,
      }
    });

    sociosDialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);

      if (result) {
        this.socio = result;
        this.socId = result.SocId;
        const socUltimoPago = `${result.SocMesPgo}/${result.SocAnoPgo}`;
        this.alumnoForm.patchValue({
          socId: result.SocId,
          socNom1: result.SocNom1,
          socApe1: result.SocApe1,
          socApe2: result.SocApe2,
          socUltimoPago,
          cantPres: result.CantPres
        });

      }

    });

  }

  get aluDVField() {
    return this.alumnoForm.get('aluDV');
  }
}


export interface Departamento {
  DepId: number;
  DepNom: string;
  Localidades: Localidad[];


}

export interface Localidad {
  LocId: number;
  LocNom: string;
  LocOri: string;
}
