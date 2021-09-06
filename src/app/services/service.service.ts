import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coord } from '../modele/coord';
import { Data } from '../modele/data';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 private host="http://localhost:8080/coord";
 private host2="http://localhost:8080/waste";

  constructor(private http:HttpClient) { }

  getCoord(): Observable<Coord[]>{
   return this.http.get<Coord[]>(this.host);
  }

  getData(): Observable<Data[]>{
    return this.http.get<Data[]>(this.host2);
   }
}
