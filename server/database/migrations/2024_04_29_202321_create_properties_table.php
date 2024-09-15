<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable(); // ->unique()
            // $table->longText('description')->nullable();
            $table->longText('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->string('address')->nullable();
            $table->string('client_address')->nullable();
            $table->enum('type', ['BIEN EN VENTE', 'RESERVATION', 'LOCATION', 'AUTRE'])->nullable();
            $table->double('price')->nullable();
            $table->double('deposit_price')->nullable();
            $table->double('price_second')->nullable();
            // $table->string('post_type')->nullable()->comment('ADMIN :admin CUSTOMER:customer');
            $table->string('location_id')->nullable(); // municipalities id
            $table->string('location_description')->nullable();
            $table->string('video_link')->nullable();
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('periodicity')->nullable();
            // details
            $table->integer('bathrooms')->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('garages')->nullable();
            $table->integer('kitchens')->nullable();
            $table->integer('rooms')->nullable();
            $table->string('area')->nullable();
            $table->string('area_unit')->nullable(); // METRE CARRE , LOT
            $table->integer('area_count')->nullable(); // METRE CARRE , LOT
            $table->integer('count_advance')->nullable(); // mois d'avance
            $table->double('count_monthly')->nullable(); // mois de loyer

            // ? RESERVATION HOTEL & RESIDENCE
            $table->boolean('jacuzzi')->nullable();
            $table->boolean('bath')->nullable();
            $table->boolean('WiFi')->nullable();
            $table->boolean('pool')->nullable();
            $table->boolean('air_conditioning')->nullable();
            $table->boolean('acd')->nullable();
            $table->string('home_type')->nullable();
            $table->string('home_type_more')->nullable();
            $table->enum('security', [null, 'WITH_GUARD', 'WITHOUT_GUARD'])->default(null)->nullable();
            $table->enum('purchase_power', [null, 'LESS_EXPENSIVE', 'EQUAL_EXPENSIVE', 'MORE_EXPENSIVE'])->default(null)->nullable();
            $table->enum('accessibility', [null, 'NOT_FAR_FROM_THE_TAR', 'A_LITTLE_FAR_FROM_THE_TAR', 'FAR_FROM_THE_TAR'])->default(null)->nullable();

            $table->enum('status', ['PUBLISH', 'DRAFT', 'DELETED', 'REJECTED', 'PENDING', 'BLOCKED'])->default('PENDING');
            $table->bigInteger('total_click')->default(0)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
