import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
 
import { Subscription } from 'rxjs';

import { EnqueteService } from '../enquete.service';
import { Enquete } from '../enquete.model';

@Component({
  selector: 'app-enquete-details',
  templateUrl: './enquete-details.component.html',
  styleUrls: ['./enquete-details.component.css']
})
export class EnqueteDetailsComponent implements OnInit {

  id: number;
  enquete: Enquete;

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private enqueteService: EnqueteService) { }

  ngOnInit(): void {
	this.id = this.route.snapshot.params['id'];
	this.getEnquete();
	this.subscription = this.enqueteService.votoAdicionado.subscribe(() => {
		this.getEnquete();
	});
  }

  getEnquete() {
	this.enqueteService.getEnquete(this.id).subscribe(enquete => {
		this.enquete = enquete;
		console.log(this.enquete.titulo);
	});
  }

  onOptionSelect(opcao_id: number) {
	this.enqueteService.votarEnquete(this.id, opcao_id);
  }

  onAdicionarOpcao(opcaoForm) {
	this.enqueteService.adicionarOpcao(this.id, opcaoForm.value.titulo);
  }

}
