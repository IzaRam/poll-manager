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
	this.getEnquetes();	
  }

  getEnquetes() {
	this.enqueteService.getEnquetes().subscribe(enquetes => {
		let test = enquetes.map(enq => {
			let inicioTemp = enq.inicio.split("-");
			let inicio = inicioTemp.map(val => parseInt(val));
			enq['dateInicio'] = new Date(inicio[0], inicio[1] - 1, inicio[2], inicio[3], inicio[4]);
			
			let finalTemp = enq.final.split("-");
			let final = finalTemp.map(val => parseInt(val));
			enq['dateFinal'] = new Date(final[0], final[1] - 1, final[2], final[3], final[4]);

			let agora = new Date();

			if (enq['dateInicio'] < agora && enq['dateFinal'] > agora) {
				enq['situacao'] = "Em Andamento";
			} else if (agora < enq['dateInicio']) {
				enq['situacao'] = "Não Iniciada";
			} else {
				enq['situacao'] = "Finalizada";
			}
		});
		this.enquetes = enquetes;
	});	
  }

  onEnqueteSelect(id: number) {
	this.router.navigate(['/enquetes', id]);
  }

}
