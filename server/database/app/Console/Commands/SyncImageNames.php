<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PropertyImages;
use Illuminate\Support\Facades\File;

class SyncImageNames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:image-names {--dry-run : Show what would be updated without making changes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync property image names in database with existing files';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Synchronizing Image Names ===');
        
        $dryRun = $this->option('dry-run');
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
        }
        
        // Obtenir tous les fichiers du dossier products
        $productsPath = public_path('assets/images/products');
        $existingFiles = File::files($productsPath);
        
        // Créer un mapping des fichiers par property_id et index
        $fileMap = [];
        foreach ($existingFiles as $file) {
            $filename = $file->getFilename();
            
            // Skip directories and non-image files
            if (strpos($filename, '__') === false || !preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $filename)) {
                continue;
            }
            
            // Parse filename: format 1: propertyId__timestamp__image__index__.ext
            //               format 2: propertyId__timestamp__image.ext (index = 0)
            $propertyId = null;
            $imageIndex = null;
            
            if (preg_match('/^(\d+)__\d+__image__(\d+)__\.(jpg|jpeg|png|gif|webp)$/i', $filename, $matches)) {
                // Format with index
                $propertyId = $matches[1];
                $imageIndex = $matches[2];
            } elseif (preg_match('/^(\d+)__\d+__image\.(jpg|jpeg|png|gif|webp)$/i', $filename, $matches)) {
                // Format without index (default to 0)
                $propertyId = $matches[1];
                $imageIndex = '0';
            } else {
                continue;
            }
            
            $key = $propertyId . '_' . $imageIndex;
            $fileMap[$key] = '/images/products/' . $filename;
        }
        
        $this->info('Found ' . count($fileMap) . ' image files in products directory');
        
        // Obtenir toutes les images de la base
        $propertyImages = PropertyImages::all();
        $updated = 0;
        $notFound = 0;
        
        foreach ($propertyImages as $propertyImage) {
            if (empty($propertyImage->property_id)) {
                continue;
            }
            
            // Extraire l'index de l'image depuis le nom actuel
            $currentImage = $propertyImage->image;
            if (preg_match('/image__(\d+)__/', $currentImage, $matches)) {
                $imageIndex = $matches[1];
                $key = $propertyImage->property_id . '_' . $imageIndex;
                
                if (isset($fileMap[$key])) {
                    $newImagePath = $fileMap[$key];
                    
                    if ($currentImage !== $newImagePath) {
                        $this->line("Property {$propertyImage->property_id}, Image {$imageIndex}:");
                        $this->line("  Current: {$currentImage}");
                        $this->line("  New:     {$newImagePath}");
                        
                        if (!$dryRun) {
                            $propertyImage->update(['image' => $newImagePath]);
                        }
                        $updated++;
                    }
                } else {
                    $this->warn("No file found for Property {$propertyImage->property_id}, Image {$imageIndex}");
                    $notFound++;
                }
            }
        }
        
        if ($dryRun) {
            $this->info("Would update {$updated} image records");
        } else {
            $this->info("Updated {$updated} image records");
        }
        
        if ($notFound > 0) {
            $this->warn("{$notFound} images in database have no corresponding files");
        }
        
        return 0;
    }
}
