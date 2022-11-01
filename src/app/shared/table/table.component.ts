import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit, Input } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit{ 
  displayedColumns: string[] = ['pid','namep','user','state', 'session','quantum', 'cputime', 'memoryUsage' ,'windowTitle','sessionName'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    // private _sAdms: AdmstareasService,
    public _contr: ControlersService,
  ) { 

  }
  ngOnInit(): void {
    
    // this.ObtenerProccess()
    // this._contr.listProcess()
  }

  

  ngAfterViewInit() {
    this._contr.dataSource.paginator = this.paginator;
    this._contr.dataSource.sort = this.sort;
    // console.log(this._contr.dataSource)
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._contr.dataSource.filter = filterValue.trim().toLowerCase();

    if (this._contr.dataSource.paginator) {
      this._contr.dataSource.paginator.firstPage();
    }
  }
}