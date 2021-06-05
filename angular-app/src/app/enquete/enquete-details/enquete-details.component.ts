import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, 
			  private enqueteService: EnqueteService,
			  private router: Router) { }

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

		let inicioStr = enquete.inicio.split("-");
		let inicio = inicioStr.map(num => parseInt(num));
		this.inicio = new Date(inicio[0], inicio[1] - 1, inicio[2],	inicio[3], inicio[4]);

		let finalStr = enquete.final.split("-");
		let final = finalStr.map(num => parseInt(num));
		this.final = new Date(final[0], final[1] - 1, final[2],	final[3], final[4]);

		let agora = new Date();

		if (this.inicio < agora && this.final > agora) {
			this.ativa = true;
		} else {
			this.ativa = false;
		}
	});
  }

  onOptionSelect(opcao_id: number) {
	if (this.ativa) {
		this.enqueteService.votarEnquete(this.id, opcao_id);
	} else {
		alert("Enquete não está em andamento no momento!");
	}
  }

  onAdicionarOpcao(opcaoForm) {
	this.enqueteService.adicionarOpcao(this.id, opcaoForm.value.titulo);
	opcaoForm.reset();
  }

  onRemoverEnquete() {
	this.enqueteService.removerEnquete(this.id);
	this.router.navigate(['/enquetes']);
  }

  onEditarEnquete() {
	this.router.navigate(['/editar', this.id]);
  }

  ngOnDestroy(): void {
	this.subscription.unsubscribe();
	clearInterval(this.interval);
  }

}
