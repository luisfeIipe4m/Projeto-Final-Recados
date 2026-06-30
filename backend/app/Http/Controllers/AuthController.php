<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

// Controller responsável por cadastro, login e logout.
// Usa Laravel Sanctum para gerar os tokens consumidos pelo front-end.
class AuthController extends Controller
{
    // POST /api/register
    // Cria um novo usuário com a senha já criptografada.
    public function register(Request $request)
    {
        $dadosValidados = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $novoUsuario = User::create([
            'name' => $dadosValidados['name'],
            'email' => $dadosValidados['email'],
            'password' => Hash::make($dadosValidados['password']),
        ]);

        return response()->json($novoUsuario, 201);
    }

    // POST /api/login
    // Confere email/senha e, se baterem, devolve um token de acesso.
    public function login(Request $request)
    {
        $credenciais = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = User::where('email', $credenciais['email'])->first();

        $credenciaisValidas = $usuario && Hash::check($credenciais['password'], $usuario->password);

        if (!$credenciaisValidas) {
            return response()->json([
                'message' => 'Credenciais inválidas',
            ], 401);
        }

        // Gera um novo token de acesso (usado pelo front no header Authorization)
        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $usuario,
        ]);
    }

    // POST /api/logout
    // Apaga todos os tokens do usuário logado, invalidando o acesso atual.
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout realizado.',
        ]);
    }
}
