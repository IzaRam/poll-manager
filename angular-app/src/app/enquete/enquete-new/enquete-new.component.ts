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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private enqueteService: EnqueteService) { }

  ngOnInit(): void {
	this.initForm();
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

	  this.enqueteService.addEnquete(this.enqueteForm.value);
	  this.router.navigate(['enquetes']);
  }

  onAddOpcao() {
    (<FormArray>this.enqueteForm.get('opcoes')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
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

  onDeleteOpcao(index: number) {
    (<FormArray>this.enqueteForm.get('opcoes')).removeAt(index);
  }

  onCancelEdit() {
    this.router.navigate(['enquetes']);
  }

}
