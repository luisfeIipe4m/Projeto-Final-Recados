<?php

namespace App\Http\Controllers;

use App\Models\Recado;
use Illuminate\Http\Request;

// Controller responsável pelo CRUD de recados.
// Toda ação aqui é restrita ao usuário autenticado (rota protegida
// por auth:sanctum) — um usuário nunca vê ou mexe no recado de outro.
class RecadoController extends Controller
{
    // GET /api/recados
    // Lista somente os recados que pertencem ao usuário logado.
    public function index(Request $request)
    {
        $usuarioLogado = $request->user();

        return Recado::where('user_id', $usuarioLogado->id)->get();
    }

    // POST /api/recados
    // Cria um novo recado vinculado ao usuário logado.
    public function store(Request $request)
    {
        $dadosValidados = $request->validate([
            'titulo' => 'required',
            'texto' => 'required',
        ]);

        return Recado::create([
            'user_id' => $request->user()->id,
            'titulo' => $dadosValidados['titulo'],
            'texto' => $dadosValidados['texto'],
        ]);
    }

    // DELETE /api/recados/{id}
    // Exclui um recado, mas só se ele pertencer ao usuário logado
    // (por isso o where('user_id', ...) antes do findOrFail).
    public function destroy(Request $request, int $id)
    {
        $recado = Recado::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $recado->delete();

        return response()->json([
            'message' => 'Recado excluído.',
        ]);
    }
}
