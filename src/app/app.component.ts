import { AfterViewInit, Component ,OnInit} from '@angular/core';
import { Coord } from './modele/coord';
import { ServiceService } from './services/service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit{
coord:Coord[];
private map;
private IconFull = L.icon({
  iconUrl: 'assets/leaflet/red.png',
  iconSize: [30, 41], // => random values you have to choose right ones for your case
  iconAnchor: [20, 51] // => random values too
});

private IconEmpty = L.icon({
  iconUrl: 'assets/leaflet/green.png',
  iconSize: [30, 41], // => random values you have to choose right ones for your case
  iconAnchor: [20, 51] // => random values too
});

private IconHalf = L.icon({
  iconUrl: 'assets/leaflet/yellow.png',
  iconSize: [30, 41], // => random values you have to choose right ones for your case
  iconAnchor: [20, 51] // => random values too
});

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 14.6889, -17.4636 ],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(){
    this.initMap();
  }


  
  constructor(private service:ServiceService){
  

  }
  
  ngOnInit(){
   this.getProduits();
  }

  getProduits(){
    /*this.service.getCoord().subscribe(data=>{
     this.coord=data;
     console.log(this.coord);
      console.log(data);
      this.coord.forEach(element => {
        console.log(element);
        L.marker([element.lat, element.lng],{icon:this.IconFull}).addTo(this.map).bindPopup(element.description);
      });
    },
    err=>console.log(err)
    
      )
*/
      this.service.getData().subscribe(data=>{
        console.log(data);
        data.forEach(element => {
          if(element.state===3)
          L.marker([element.lat, element.lng],{icon:this.IconFull}).addTo(this.map).bindPopup(element.description);
          if(element.state===2)
          L.marker([element.lat, element.lng],{icon:this.IconHalf}).addTo(this.map).bindPopup(element.description);
          if(element.state===1)
          L.marker([element.lat, element.lng],{icon:this.IconEmpty}).addTo(this.map).bindPopup(element.description);
        });
      });
  }
}
