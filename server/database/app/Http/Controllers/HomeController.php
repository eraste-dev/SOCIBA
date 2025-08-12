<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;
use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function index()
    {
        return ResponseService::success(
            [
                "message" => "Welcome to the BAJORAH Server API",
                'version' => 'v1.0.0',
                'status' => 'ok',
                'author' => 'BAJORAH',
                'license' => 'MIT',
                'time' => date('Y-m-d H:i:s'),
                'env' => config('app.env'),
                'debug' => config('app.debug'),
                'key' => config('app.key'),
                'name' => config('app.name'),
            ],
            "Welcome to the BAJORAH Server API"
        );
    }
}
