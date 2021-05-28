import { Component, OnInit } from '@angular/core';
import { EnqueteService } from '../enquete.service';
import { Router } from '@angular/router';

import { Enquete } from '../enquete.model';

@Component({
  selector: 'app-enquete-list',
  templateUrl: './enquete-list.component.html',
  styleUrls: ['./enquete-list.component.css']
})
export class EnqueteListComponent implements OnInit {

  enquetes: Enquete[];

  constructor(private enqueteService: EnqueteService, private router: Router) { }

  ngOnInit(): void {
	this.enqueteService.getEnquetes().subscribe(enquetes => {
		this.enquetes = enquetes;
	});	
  }

  onEnqueteSelect(id: number) {
	console.log(id);
	this.router.navigate(['/enquetes', id]);
  }

}
