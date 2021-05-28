<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enquete;
use App\Models\Opcoes;

class EnqueteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Enquete::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		$request->validate([
			'titulo' => 'required',
			'inicio' => 'required',
			'final' => 'required'
		]);

		return Enquete::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
		$enquete = Enquete::where('id', $id)->first();
		if (!$enquete) {
			return response([
					'message' => 'Nenhuma enquete encontrada com o id informado'
			], 404);
		}
		$enquete->getOptions;
		return $enquete;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $enquete = Enquete::where('id', $id)->first();
		if (!$enquete) {
			return response([
					'message' => 'Nenhuma enquete encontrada com o id informado'
			], 404);
		}
		$enquete->update($request->all());
		return $enquete;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
		return Enquete::destroy($id);
    }

	/**
	 * Adiciona opções para uma enquete existente		
	 *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function opcoes(Request $request, $id)
    {
		$request->validate([
			'enquete_id' => 'required',
			'titulo' => 'required'
		]);
		return Opcoes::create($request->all());
    }

	/**
	 * Adiciona votos a opções para uma enquete existente		
	 *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function votar(Request $request, $id)
    {
		$request->validate([
			'enquete_id' => 'required',
			'opcao_id' => 'required'
		]);
		$opcao = Opcoes::where('id', $id)->first();
		$opcao->update(['votos', ++$opcao->votos]);
		return $opcao;
    }
}
