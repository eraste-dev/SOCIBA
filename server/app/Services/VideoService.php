<?php

namespace App\Services;

use Illuminate\Support\Env;

class VideoService
{
    public static function getVideo(string $videoName): ?string
    {
        // Vérifie si le fichier image existe
        if (Env('APP_ENV') == 'production') {
            return 'https://api.bajorah.com/core/public/assets' . $videoName;
            // return 'https://api.bajorah.com/assets' . $videoName;
        }

        $path = public_path('assets' . $videoName);
        if (file_exists($path)) {
            return asset('assets' . $videoName);
        }

        return null;
    }

    public static function getVideos(string $directory): array
    {
        $videos = [];

        // Vérifiez si le répertoire existe
        if (is_dir($directory)) {
            // Ouvrez le répertoire
            if ($handle = opendir($directory)) {
                // Parcourez le répertoire
                while (false !== ($entry = readdir($handle))) {
                    // Vérifiez si l'entrée est un fichier et s'il s'agit d'une image
                    if (is_file($directory . $entry) && self::isVideo($entry)) {
                        $videos[] = $entry;
                    }
                }
                closedir($handle);
            }
        }

        return $videos;
    }

    private static function isVideo(string $filename): bool
    {
        // Obtenez l'extension du fichier
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        // Liste des extensions d'image autorisées
        $allowedExtensions = ['mp4', 'mkv', 'webm', '3gp', 'avi', 'flv', 'mov', 'wmv', 'mpg', 'mpeg'];
        // Vérifiez si l'extension est autorisée
        return in_array($extension, $allowedExtensions);
    }
}
