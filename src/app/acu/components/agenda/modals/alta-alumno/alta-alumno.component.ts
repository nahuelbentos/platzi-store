import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AcuService } from '@acu/services/acu.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';

@Component({
  selector: 'app-alta-alumno',
  templateUrl: './alta-alumno.component.html',
  styleUrls: ['./alta-alumno.component.scss']
})
export class AltaAlumnoComponent {
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
    aluMail: [null, Validators.required]
  });

  hasUnitNumber = false;

  departamentos = [
    { aluDepId: 'Alabama', aluDepNom: 'AL' },
    { aluDepId: 'Alaska', aluDepNom: 'AK' },
    { aluDepId: 'American Samoa', aluDepNom: 'AS' },
    { aluDepId: 'Arizona', aluDepNom: 'AZ' },
    { aluDepId: 'Arkansas', aluDepNom: 'AR' },
    { aluDepId: 'California', aluDepNom: 'CA' },
    { aluDepId: 'Colorado', aluDepNom: 'CO' },
    { aluDepId: 'Connecticut', aluDepNom: 'CT' },
    { aluDepId: 'Delaware', aluDepNom: 'DE' },
    { aluDepId: 'District Of Columbia', aluDepNom: 'DC' },
    { aluDepId: 'Federated States Of Micronesia', aluDepNom: 'FM' },
    { aluDepId: 'Florida', aluDepNom: 'FL' },
    { aluDepId: 'Georgia', aluDepNom: 'GA' },
    { aluDepId: 'Guam', aluDepNom: 'GU' },
    { aluDepId: 'Hawaii', aluDepNom: 'HI' },
    { aluDepId: 'Idaho', aluDepNom: 'ID' },
    { aluDepId: 'Illinois', aluDepNom: 'IL' },
    { aluDepId: 'Indiana', aluDepNom: 'IN' },
    { aluDepId: 'Iowa', aluDepNom: 'IA' },
    { aluDepId: 'Kansas', aluDepNom: 'KS' },
    { aluDepId: 'Kentucky', aluDepNom: 'KY' },
    { aluDepId: 'Louisiana', aluDepNom: 'LA' },
    { aluDepId: 'Maine', aluDepNom: 'ME' },
    { aluDepId: 'Marshall Islands', aluDepNom: 'MH' },
    { aluDepId: 'Maryland', aluDepNom: 'MD' },
    { aluDepId: 'Massachusetts', aluDepNom: 'MA' },
    { aluDepId: 'Michigan', aluDepNom: 'MI' },
    { aluDepId: 'Minnesota', aluDepNom: 'MN' },
    { aluDepId: 'Mississippi', aluDepNom: 'MS' },
    { aluDepId: 'Missouri', aluDepNom: 'MO' },
    { aluDepId: 'Montana', aluDepNom: 'MT' },
    { aluDepId: 'Nebraska', aluDepNom: 'NE' },
    { aluDepId: 'Nevada', aluDepNom: 'NV' },
    { aluDepId: 'New Hampshire', aluDepNom: 'NH' },
    { aluDepId: 'New Jersey', aluDepNom: 'NJ' },
    { aluDepId: 'New Mexico', aluDepNom: 'NM' },
    { aluDepId: 'New York', aluDepNom: 'NY' },
    { aluDepId: 'North Carolina', aluDepNom: 'NC' },
    { aluDepId: 'North Dakota', aluDepNom: 'ND' },
    { aluDepId: 'Northern Mariana Islands', aluDepNom: 'MP' },
    { aluDepId: 'Ohio', aluDepNom: 'OH' },
    { aluDepId: 'Oklahoma', aluDepNom: 'OK' },
    { aluDepId: 'Oregon', aluDepNom: 'OR' },
    { aluDepId: 'Palau', aluDepNom: 'PW' },
    { aluDepId: 'Pennsylvania', aluDepNom: 'PA' },
    { aluDepId: 'Puerto Rico', aluDepNom: 'PR' },
    { aluDepId: 'Rhode Island', aluDepNom: 'RI' },
    { aluDepId: 'South Carolina', aluDepNom: 'SC' },
    { aluDepId: 'South Dakota', aluDepNom: 'SD' },
    { aluDepId: 'Tennessee', aluDepNom: 'TN' },
    { aluDepId: 'Texas', aluDepNom: 'TX' },
    { aluDepId: 'Utah', aluDepNom: 'UT' },
    { aluDepId: 'Vermont', aluDepNom: 'VT' },
    { aluDepId: 'Virgin Islands', aluDepNom: 'VI' },
    { aluDepId: 'Virginia', aluDepNom: 'VA' },
    { aluDepId: 'Washington', aluDepNom: 'WA' },
    { aluDepId: 'West Virginia', aluDepNom: 'WV' },
    { aluDepId: 'Wisconsin', aluDepNom: 'WI' },
    { aluDepId: 'Wyoming', aluDepNom: 'WY' }
  ];

  localidades = [
    { locId: 'Alabama', locNom: 'AL' },
    { locId: 'Alaska', locNom: 'AK' },
    { locId: 'American Samoa', locNom: 'AS' },
    { locId: 'Arizona', locNom: 'AZ' },
    { locId: 'Arkansas', locNom: 'AR' },
    { locId: 'California', locNom: 'CA' },
    { locId: 'Colorado', locNom: 'CO' },
    { locId: 'Connecticut', locNom: 'CT' },
    { locId: 'Delaware', locNom: 'DE' },
    { locId: 'District Of Columbia', locNom: 'DC' },
    { locId: 'Federated States Of Micronesia', locNom: 'FM' },
    { locId: 'Florida', locNom: 'FL' },
    { locId: 'Georgia', locNom: 'GA' },
    { locId: 'Guam', locNom: 'GU' },
    { locId: 'Hawaii', locNom: 'HI' },
    { locId: 'Idaho', locNom: 'ID' },
    { locId: 'Illinois', locNom: 'IL' },
    { locId: 'Indiana', locNom: 'IN' },
    { locId: 'Iowa', locNom: 'IA' },
    { locId: 'Kansas', locNom: 'KS' },
    { locId: 'Kentucky', locNom: 'KY' },
    { locId: 'Louisiana', locNom: 'LA' },
    { locId: 'Maine', locNom: 'ME' },
    { locId: 'Marshall Islands', locNom: 'MH' },
    { locId: 'Maryland', locNom: 'MD' },
    { locId: 'Massachusetts', locNom: 'MA' },
    { locId: 'Michigan', locNom: 'MI' },
    { locId: 'Minnesota', locNom: 'MN' },
    { locId: 'Mississippi', locNom: 'MS' },
    { locId: 'Missouri', locNom: 'MO' },
    { locId: 'Montana', locNom: 'MT' },
    { locId: 'Nebraska', locNom: 'NE' },
    { locId: 'Nevada', locNom: 'NV' },
    { locId: 'New Hampshire', locNom: 'NH' },
    { locId: 'New Jersey', locNom: 'NJ' },
    { locId: 'New Mexico', locNom: 'NM' },
    { locId: 'New York', locNom: 'NY' },
    { locId: 'North Carolina', locNom: 'NC' },
    { locId: 'North Dakota', locNom: 'ND' },
    { locId: 'Northern Mariana Islands', locNom: 'MP' },
    { locId: 'Ohio', locNom: 'OH' },
    { locId: 'Oklahoma', locNom: 'OK' },
    { locId: 'Oregon', locNom: 'OR' },
    { locId: 'Palau', locNom: 'PW' },
    { locId: 'Pennsylvania', locNom: 'PA' },
    { locId: 'Puerto Rico', locNom: 'PR' },
    { locId: 'Rhode Island', locNom: 'RI' },
    { locId: 'South Carolina', locNom: 'SC' },
    { locId: 'South Dakota', locNom: 'SD' },
    { locId: 'Tennessee', locNom: 'TN' },
    { locId: 'Texas', locNom: 'TX' },
    { locId: 'Utah', locNom: 'UT' },
    { locId: 'Vermont', locNom: 'VT' },
    { locId: 'Virgin Islands', locNom: 'VI' },
    { locId: 'Virginia', locNom: 'VA' },
    { locId: 'Washington', locNom: 'WA' },
    { locId: 'West Virginia', locNom: 'WV' },
    { locId: 'Wisconsin', locNom: 'WI' },
    { locId: 'Wyoming', locNom: 'WY' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  onSubmit() {
    alert('Thanks!');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  get aluDVField() {
    return this.alumnoForm.get('aluDV');
  }
}
