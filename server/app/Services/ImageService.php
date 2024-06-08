<?php

namespace App\Services;

use Illuminate\Support\Env;

class ImageService
{
    public static function getImage(string $imageName): ?string
    {
        // Vérifie si le fichier image existe
        if (Env('APP_ENV') == 'production') {
            return 'https://api.eebtp-ci.com/assets' . $imageName;
        }

        $imagePath = public_path('assets' . $imageName);
        if (file_exists($imagePath)) {
            return asset('assets' . $imageName);
        }

        return null;
    }

    public static function getImages(string $directory): array
    {
        $images = [];

        // Vérifiez si le répertoire existe
        if (is_dir($directory)) {
            // Ouvrez le répertoire
            if ($handle = opendir($directory)) {
                // Parcourez le répertoire
                while (false !== ($entry = readdir($handle))) {
                    // Vérifiez si l'entrée est un fichier et s'il s'agit d'une image
                    if (is_file($directory . $entry) && self::isImage($entry)) {
                        $images[] = $entry;
                    }
                }
                closedir($handle);
            }
        }

        return $images;
    }

    private static function isImage(string $filename): bool
    {
        // Obtenez l'extension du fichier
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        // Liste des extensions d'image autorisées
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        // Vérifiez si l'extension est autorisée
        return in_array($extension, $allowedExtensions);
    }
}
