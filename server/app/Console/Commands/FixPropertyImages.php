<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PropertyImages;
use App\Models\Property;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class FixPropertyImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:property-images {--dry-run : Show what would be done without making changes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix property images by cleaning orphans and creating records for existing files';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Fixing Property Images ===');
        
        $dryRun = $this->option('dry-run');
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
        }
        
        // Step 1: Clean orphan records
        $this->info('--- Cleaning orphan records ---');
        $orphanIds = PropertyImages::whereNotIn('property_id', 
            Property::pluck('id')
        )->pluck('property_id')->unique();
        
        $this->line('Found orphan Property IDs: ' . $orphanIds->implode(', '));
        
        if (!$dryRun && $orphanIds->count() > 0) {
            $deleted = PropertyImages::whereIn('property_id', $orphanIds)->delete();
            $this->info("Deleted {$deleted} orphan image records");
        } else {
            $orphanCount = PropertyImages::whereIn('property_id', $orphanIds)->count();
            $this->info("Would delete {$orphanCount} orphan image records");
        }
        
        // Step 2: Create records for existing files
        $this->info('--- Creating records for existing files ---');
        
        $productsPath = public_path('assets/images/products');
        $existingFiles = File::files($productsPath);
        $created = 0;
        
        // Group files by property_id
        $filesByProperty = [];
        
        foreach ($existingFiles as $file) {
            $filename = $file->getFilename();
            
            // Skip non-image files and special files
            if (!preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $filename) || strpos($filename, '__') === false) {
                continue;
            }
            
            // Extract property_id
            if (preg_match('/^(\d+)__/', $filename, $matches)) {
                $propertyId = (int)$matches[1];
                
                // Verify property exists
                if (Property::where('id', $propertyId)->exists()) {
                    if (!isset($filesByProperty[$propertyId])) {
                        $filesByProperty[$propertyId] = [];
                    }
                    $filesByProperty[$propertyId][] = $filename;
                } else {
                    $this->warn("Property {$propertyId} does not exist, skipping {$filename}");
                }
            }
        }
        
        foreach ($filesByProperty as $propertyId => $files) {
            $this->line("Property {$propertyId}: " . count($files) . " files");
            
            // Check if property already has image records
            $existingCount = PropertyImages::where('property_id', $propertyId)->count();
            if ($existingCount > 0) {
                $this->line("  Already has {$existingCount} image records, skipping");
                continue;
            }
            
            // Sort files to ensure consistent ordering
            sort($files);
            
            // Create image records
            foreach ($files as $index => $filename) {
                $imagePath = '/images/products/' . $filename;
                
                $this->line("  Creating: {$imagePath}");
                
                if (!$dryRun) {
                    PropertyImages::create([
                        'property_id' => $propertyId,
                        'image' => $imagePath,
                        'featured_image' => $index === 0 ? 1 : 0  // First image as featured
                    ]);
                }
                $created++;
            }
        }
        
        if ($dryRun) {
            $this->info("Would create {$created} new image records");
        } else {
            $this->info("Created {$created} new image records");
        }
        
        // Step 3: Verify results
        $this->info('--- Final Status ---');
        $totalProperties = Property::count();
        $propertiesWithImages = Property::whereHas('images')->count();
        $totalImageRecords = PropertyImages::count();
        
        $this->line("Total properties: {$totalProperties}");
        $this->line("Properties with images: {$propertiesWithImages}");
        $this->line("Total image records: {$totalImageRecords}");
        
        return 0;
    }
}
