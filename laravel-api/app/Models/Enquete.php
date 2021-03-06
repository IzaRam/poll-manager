<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquete extends Model
{
    use HasFactory;
	
	protected $fillable = [
		'titulo',
		'descricao',
		'inicio',
		'final'
	];

	function getOptions() {
		return $this->hasMany("App\Models\Opcoes");
	}
}
