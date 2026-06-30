<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recado extends Model
{
    protected $fillable = [
        'user_id',
        'titulo',
        'texto',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}