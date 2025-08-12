<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PropertyImages;
use App\Models\Property;
use App\Services\ImageService;

class DebugImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'debug:images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Debug property images';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Debugging Property Images ===');
        
        // Examiner les Property IDs dans les fichiers
        $this->info('--- Property IDs in files ---');
        $productsPath = public_path('assets/images/products');
        $existingFiles = \Illuminate\Support\Facades\File::files($productsPath);
        $filePropertyIds = [];
        
        foreach ($existingFiles as $file) {
            $filename = $file->getFilename();
            if (preg_match('/^(\d+)__/', $filename, $matches)) {
                $propertyId = $matches[1];
                if (!in_array($propertyId, $filePropertyIds)) {
                    $filePropertyIds[] = $propertyId;
                }
            }
        }
        sort($filePropertyIds);
        $this->line('Files exist for Property IDs: ' . implode(', ', $filePropertyIds));
        
        // Examiner les Property IDs en base
        $this->info('--- Property IDs in database ---');
        $dbPropertyIds = PropertyImages::distinct('property_id')->pluck('property_id')->filter()->sort()->values();
        $this->line('Database has images for Property IDs: ' . $dbPropertyIds->implode(', '));
        
        // Vérifier s'il y a des Property records pour ces IDs
        $this->info('--- Property records ---');
        $properties = \App\Models\Property::whereIn('id', $filePropertyIds)->pluck('id')->sort();
        $this->line('Property records exist for IDs: ' . $properties->implode(', '));
        
        // Examiner quelques correspondances
        $this->info('--- Sample mappings ---');
        foreach (array_slice($filePropertyIds, 0, 5) as $propertyId) {
            $dbImages = PropertyImages::where('property_id', $propertyId)->get(['image']);
            $this->line("Property {$propertyId}:");
            if ($dbImages->count() > 0) {
                foreach ($dbImages as $img) {
                    $this->line("  DB: {$img->image}");
                }
            } else {
                $this->line("  No images in database");
            }
            
            // Files for this property
            foreach ($existingFiles as $file) {
                $filename = $file->getFilename();
                if (preg_match('/^' . $propertyId . '__/', $filename)) {
                    $this->line("  File: {$filename}");
                }
            }
            $this->line('');
        }
        
        return 0;
    }
}
