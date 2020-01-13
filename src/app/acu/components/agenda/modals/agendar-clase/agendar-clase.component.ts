import { Component, OnInit, Inject } from '@angular/core';
import { AgendaComponent, DialogData } from '../../agenda.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agendar-clase',
  templateUrl: './agendar-clase.component.html',
  styleUrls: ['./agendar-clase.component.scss']
})
export class AgendarClaseComponent implements OnInit {

  selected = ' ';
  constructor(
    public dialogRef: MatDialogRef<AgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
