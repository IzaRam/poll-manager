import { Component, OnInit } from '@angular/core';
import { EnqueteService } from './enquete/enquete.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	constructor(private enqueteService: EnqueteService) { } 	

	ngOnInit(): void {
		this.enqueteService.getEnquetes().subscribe(enquetes => {
			console.log(enquetes);
		});	
		
		this.enqueteService.getEnquete(1).subscribe(enquete => {
			console.log(enquete);
		});
	}

}
