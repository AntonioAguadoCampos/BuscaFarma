<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function create(Request $request)
    {
       
        $id = Message::create($request->all());
        return response()->json($id);
    }
}
