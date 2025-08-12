<?php

namespace App\Services;

use Illuminate\Support\Env;

class ImageService
{
    public static function getImage(string $imageName): ?string
    {
        // Si l'imageName contient déjà une URL complète, la retourner directement
        if (str_starts_with($imageName, 'http')) {
            return $imageName;
        }

        // Vérifie si le fichier image existe
       /* if (Env('APP_ENV') == 'production') {
            // En production, retourner l'URL complète
            return 'https://api.bajorah.com/core/public/assets' . $imageName;
            // return $imageName;
        }

        // En développement, utiliser asset() pour construire l'URL
        return $imageName;*/

        if (Env('APP_ENV') == 'production') {
            // En production, retourner l'URL complète
            return 'https://api.bajorah.com/core/public/assets' . $imageName;
        }

        // En développement, utiliser asset() pour construire l'URL
        return asset('core/public/assets' . $imageName);
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
