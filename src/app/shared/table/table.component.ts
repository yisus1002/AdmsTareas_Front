import { ControlersService } from './../../services/controlers.service';
import { Component,  OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';  

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit{ 
  displayedColumns: string[] = [
                                'PID',
                                'nombreDeImagen',
                                'nombreDeUsuario',
                                'estado', 
                                'numDeSesion',
                                'quantum', 
                                'tiempoDeCpu',
                                'usoDeMemoria',
                                'tituloDeVentana',
                                'nombreDeSesion',
                                'options'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  constructor( 
    public _contr: ControlersService,
  ) { 
  }
  ngOnInit(): void {}

  

  ngAfterViewInit() {
    this._contr.dataSource.paginator = this.paginator;
    this._contr.dataSource.sort = this.sort; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._contr.dataSource.filter = filterValue.trim().toLowerCase();

    if (this._contr.dataSource.paginator) {
      this._contr.dataSource.paginator.firstPage();
    }
  }

    seleccc(processys:any){ 
      if(this._contr.selection.isSelected(processys)===false){
        this._contr.seleccionProcess.push(processys) 
      }else{ 
        const newSeleccionProcess = this._contr.seleccionProcess.filter((data:any)=>parseInt(processys?.PID) != parseInt(data?.PID))
        this._contr.seleccionProcess=newSeleccionProcess;  
      } 
    }
}