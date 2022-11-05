import { Processes } from './../models/interfaces/processes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Processys } from '../models/interfaces/processys';

@Injectable({
  providedIn: 'root'
})
export class AdmstareasService {
  public api:string=`http://localhost:3000/`;
  constructor(
    private http:HttpClient
  ) { }

  getProcessys():Observable<Processys[]>{
    return (this.http.get<any>(`${this.api}processys`));
  }
  postProcessys():Observable<any>{
    return (this.http.post<any>(`${this.api}processys`,''));
  }
  
  
  getProcess():Observable<Processes[]>{
    return (this.http.get<any>(`${this.api}process`));
  }
  getProcessById(id:number):Observable<any>{
    return (this.http.get<any>(`${this.api}process/${id}`));
  }
  postProcess(processes:Processys[], idCtalg:number):Observable<any>{
    return (this.http.post<any>(`${this.api}process/${idCtalg}`, processes));
  }
  putProcess(idProcesses:number,processes:object):Observable<any>{
    return (this.http.put<any>(`${this.api}process/${idProcesses}`, processes));
  }
  delProcess(id:number):Observable<any>{
    return (this.http.delete<any>(`${this.api}process/${id}`));
  }

  
  
  getCatalogue():Observable<any>{
    return (this.http.get<any>(`${this.api}catalogue`)).pipe(map((data:any)=>data?.body));
  }
  getCataloogueById(id:number):Observable<any>{
    return (this.http.get<any>(`${this.api}catalogue/${id}`)).pipe(map((data:any)=>data?.body));
  }
  postCatalogue(name:object):Observable<any>{
    return (this.http.post<any>(`${this.api}catalogue`,name));
  }
  putCatalogue(id:number, name:object):Observable<any>{
    return (this.http.put<any>(`${this.api}catalogue/${id}`,name));
  }

  delCatalogue(id:number):Observable<any>{
    return (this.http.delete<any>(`${this.api}catalogue/${id}`));
  }




}
