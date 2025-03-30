<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            background-color: #f8f9fa;
        }

        .navbar-custom {
            background-color: #343a40;
        }

        .navbar-custom .navbar-brand,
        .navbar-custom .nav-link {
            color: #ffffff;
        }

        .welcome-container {
            text-align: center;
            background: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        .welcome-title {
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-weight: bold;
            color: #343a40;
        }

        .welcome-text {
            font-size: 1.25rem;
            margin-bottom: 20px;
            color: #6c757d;
        }

        .btn-custom {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
        }

        .btn-custom:hover {
            background-color: #0056b3;
            border-color: #004085;
        }

        .footer-custom {
            background-color: #343a40;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
            position: absolute;
            width: 100%;
            bottom: 0;
        }

        .flex-fill {
            flex: 1 1 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <a class="navbar-brand" href="#">BAJORAH</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Accueil <span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="flex-fill">
        <div class="welcome-container">
            <div class="welcome-title">Bienvenue</div>
            <div class="welcome-text">Site d'offres et annonces de la société</div>
            {{-- <a href="#" class="btn btn-custom">En savoir plus</a> --}}
        </div>
    </div>

    <footer class="footer-custom">
        © {{ date('Y') }} BAJORAH. Tous droits réservés.
    </footer>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
