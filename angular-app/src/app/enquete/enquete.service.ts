import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Enquete } from './enquete.model';

@Injectable({
  providedIn: 'root'
})
export class EnqueteService {

	votoAdicionado = new Subject<void>();

	baseUrl: string = "http://127.0.0.1:8000/api/enquetes/";

	constructor(private http: HttpClient) { } 	

	getEnquetes(): Observable<Enquete[]> {
		return this.http.get<Enquete[]>(this.baseUrl);
	}
	
	getEnquete(id: number): Observable<Enquete> {
		return this.http.get<Enquete>(this.baseUrl + id);
	}

	addEnquete(enquete) {
		const enqueteNew = new Enquete(0, enquete.titulo, enquete.descricao, enquete.inicio, enquete.final, {});
		this.http.post(this.baseUrl, enqueteNew).subscribe(response => {
			console.log(response);
			for (let i = 0; i < enquete.opcoes.length; i++) {
				this.adicionarOpcao(response['id'], enquete.opcoes[i].name);
			}
		})
	}

	updateEnquete(enquete_id: number, enquete) {
		const enqueteNew = new Enquete(0, enquete.titulo, enquete.descricao, enquete.inicio, enquete.final, {});
		this.http.delete(this.baseUrl + "opcoes/" + enquete_id).subscribe(response => {
			console.log(response);
		});
		this.http.put(this.baseUrl + enquete_id, enqueteNew).subscribe(response => {
			console.log(response);
			for (let i = 0; i < enquete.opcoes.length; i++) {
				this.adicionarOpcao(response['id'], enquete.opcoes[i].name);
			}
		});
	}

	adicionarOpcao(enquete_id: number, opcao_titulo: string) {
		const postData = {
			'enquete_id': enquete_id,
			'titulo': opcao_titulo
		}
		this.http.post(this.baseUrl + "opcoes/" + enquete_id, postData).subscribe(response => {
			console.log(response);
			this.votoAdicionado.next();
		});
	}

	votarEnquete(enquete_id:number, opcao_id:number) {
		const voto = {
			'enquete_id': enquete_id,
			'opcao_id': opcao_id
		};
		this.http.post(this.baseUrl + "opcoes/votar/" + enquete_id, voto).subscribe(response => {
			alert("Voto computado com sucesso!");
			this.votoAdicionado.next();
		});
	}

	removerEnquete(enquete_id: number) {
		this.http.delete(this.baseUrl + enquete_id).subscribe(response => {
			console.log(response);
		});
	}
}
