<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{ config('app.name') }}</title>
    <link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
</head>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
    }

    .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .welcome-message {
        text-align: center;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 20px;
    }

    .btn {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #337ab7;
        color: #fff;
    }

    .btn:hover {
        background-color: #23527c;
    }

    .btn-secondary {
        background-color: #666;
        color: #fff;
    }

    .btn-secondary:hover {
        background-color: #444;
    }
</style>

<body>
    <div class="container">
        <div class="welcome-message">
            <h1>Welcome to SOCIBA API</h1>
            {{-- <p>This is a minimalistic welcome page for your Laravel application.</p> --}}
            {{-- <a href="{{ route('login') }}" class="btn btn-primary">Login</a> --}}
            {{-- <a href="{{ route('register') }}" class="btn btn-secondary">Register</a> --}}
        </div>
    </div>
</body>

</html>
