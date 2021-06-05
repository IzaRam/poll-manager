import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EnqueteService } from '../enquete.service';

@Component({
  selector: 'app-enquete-new',
  templateUrl: './enquete-new.component.html',
  styleUrls: ['./enquete-new.component.css']
})
export class EnqueteNewComponent implements OnInit {

  enqueteForm: FormGroup;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private enqueteService: EnqueteService) { }

  ngOnInit(): void {
	this.id = this.route.snapshot.params['id'];
	if (this.id) {
		this.initForm();
		this.enqueteService.getEnquete(this.id).subscribe(enquete => {
			this.initEditForm(enquete);
		});
	} else {
		this.initForm();
	}
  }

  
  get controls() {
    return (<FormArray>this.enqueteForm.get('opcoes')).controls;
  }

  onSubmit() {

	  this.enqueteForm.value.inicio = this.enqueteForm.value['inicio-date']
	  									+ "-"
										+ this.enqueteForm.value['inicio-time'].replace(":", "-");
	
	  this.enqueteForm.value.final = this.enqueteForm.value['final-date']
	  									+ "-"
										+ this.enqueteForm.value['final-time'].replace(":", "-");
	
	  if(!this.id) {			
	  	this.enqueteService.addEnquete(this.enqueteForm.value);
	  	this.router.navigate(['enquetes']);
	  } else {
		this.enqueteService.updateEnquete(this.id, this.enqueteForm.value);
	  	this.router.navigate(['enquetes', this.id]);
	  }
  }

  onAddOpcao(opcao = null) {
    (<FormArray>this.enqueteForm.get('opcoes')).push(
      new FormGroup({
        'name': new FormControl(opcao, Validators.required)
      })
    );
  }

  private initForm() {
	
    let enqueteTitulo = '';
    let enqueteDescricao = '';
    let enqueteInicio = '';
    let enqueteFinal = '';
    let enqueteOpcoes = new FormArray([]);

    this.enqueteForm = new FormGroup({
      'titulo': new FormControl(enqueteTitulo, Validators.required),
      'descricao': new FormControl(enqueteDescricao, Validators.required),
      'inicio-date': new FormControl(enqueteInicio, Validators.required),
      'inicio-time': new FormControl(enqueteInicio, Validators.required),
      'final-date': new FormControl(enqueteFinal, Validators.required),
      'final-time': new FormControl(enqueteFinal, Validators.required),
      'opcoes': enqueteOpcoes
    });

  }

  private initEditForm(enquete) {
	let inicioDate = enquete.inicio.split("-").slice(0,3).join("-");
	let inicioTime = enquete.inicio.split("-").slice(3,5).join(":");
	
	let finalDate = enquete.final.split("-").slice(0,3).join("-");
	let finalTime = enquete.final.split("-").slice(3,5).join(":");

    let enqueteTitulo = enquete.titulo;
    let enqueteDescricao = enquete.descricao;
    let enqueteInicioDate = inicioDate;
    let enqueteInicioTime = inicioTime;
    let enqueteFinalDate = finalDate;
    let enqueteFinalTime = finalTime;
    let enqueteOpcoes = new FormArray([]);

    this.enqueteForm = new FormGroup({
      'titulo': new FormControl(enqueteTitulo, Validators.required),
      'descricao': new FormControl(enqueteDescricao, Validators.required),
      'inicio-date': new FormControl(enqueteInicioDate, Validators.required),
      'inicio-time': new FormControl(enqueteInicioTime, Validators.required),
      'final-date': new FormControl(enqueteFinalDate, Validators.required),
      'final-time': new FormControl(enqueteFinalTime, Validators.required),
      'opcoes': enqueteOpcoes
    });

	enquete.get_options.map(option => {
		this.onAddOpcao(option.titulo);
	});
  }

  onDeleteOpcao(index: number) {
    (<FormArray>this.enqueteForm.get('opcoes')).removeAt(index);
  }

  onCancelEdit() {
    this.router.navigate(['enquetes']);
  }

}
