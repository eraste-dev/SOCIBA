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
            $table->enum('type', ['ACHAT', 'VENTE', 'LOCATION', 'AUTRE'])->nullable();
            $table->double('price')->nullable();
            $table->double('deposit_price')->nullable();
            // $table->string('post_type')->nullable()->comment('ADMIN :admin CUSTOMER:customer');
            $table->string('location_id')->nullable(); // municipalities id
            $table->string('location_description')->nullable();
            $table->string('video_link')->nullable();
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('periodicity')->nullable();
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
