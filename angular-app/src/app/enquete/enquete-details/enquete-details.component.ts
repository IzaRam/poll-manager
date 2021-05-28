import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EnqueteDetailsComponent implements OnInit, OnDestroy {

  id: number;
  enquete: Enquete;
  interval: any;
  ativa: boolean;
  inicio: Date;
  final: Date;

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private enqueteService: EnqueteService) { }

  ngOnInit(): void {
	this.id = this.route.snapshot.params['id'];
	this.getEnquete();
	this.subscription = this.enqueteService.votoAdicionado.subscribe(() => {
		this.getEnquete();
	});
	this.interval = setInterval(() => {
            this.getEnquete();
        }, 5000);
  }

  getEnquete() {
	this.enqueteService.getEnquete(this.id).subscribe(enquete => {
		this.enquete = enquete;
		this.inicio = new Date(
				parseInt(enquete.inicio.split("-")[2]),
				parseInt(enquete.inicio.split("-")[1]) - 1,
				parseInt(enquete.inicio.split("-")[0]),
				parseInt(enquete.inicio.split("-")[3]),
				parseInt(enquete.inicio.split("-")[4]));
		this.final = new Date(
				parseInt(enquete.final.split("-")[2]),
				parseInt(enquete.final.split("-")[1]) - 1,
				parseInt(enquete.final.split("-")[0]),
				parseInt(enquete.final.split("-")[3]),
				parseInt(enquete.final.split("-")[4]));

		let agora = new Date();

		if (this.inicio < agora && this.final > agora) {
			this.ativa = true;
		} else {
			this.ativa = false;
		}
		console.log(this.ativa);
	});
  }

  onOptionSelect(opcao_id: number) {
	this.enqueteService.votarEnquete(this.id, opcao_id);
  }

  onAdicionarOpcao(opcaoForm) {
	this.enqueteService.adicionarOpcao(this.id, opcaoForm.value.titulo);
	opcaoForm.reset();
  }

  ngOnDestroy(): void {
	this.subscription.unsubscribe();
	clearInterval(this.interval);
  }

}
