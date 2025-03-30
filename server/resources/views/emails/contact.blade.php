<!DOCTYPE html>
<html>

<head>
    <title>Nouveau message de contact</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h1 class="h4">Nouveau message de contact</h1>
            </div>
            <div class="card-body">
                <p class="mb-2"><strong>Nom:</strong> {{ $name }}</p>
                <p class="mb-2"><strong>Email:</strong> {{ $email }}</p>
                <p class="mb-2"><strong>Message:</strong></p>
                <p>{{ $message }}</p>
            </div>
        </div>
    </div>
</body>

</html>
