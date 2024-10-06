<?php

namespace App\Http\Controllers;

use App\Http\Resources\SettingResource;
use App\Models\Settings;
use App\Services\ResponseService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (isset($_GET['key'])) {
            $setting = Settings::where('key', $_GET['key'])->first();
        } else {
            $setting = Settings::where('key', Settings::default_key())->first();
        }

        return ResponseService::success(new SettingResource($setting));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'nullable|string',
            'value' => 'nullable|string',
            'about_us' => 'nullable|string',
            'terms_and_conditions' => 'nullable|string',
            'privacy_policy' => 'nullable|string',
            'refund_policy' => 'nullable|string',
            'support_policy' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        $setting = null;
        if (isset($request->key) || $request->key == null) {
            $setting = Settings::where('key', Settings::default_key())->first();
        } else {
            $setting = Settings::where('key', $request->key)->first();
        }

        $setting->update($request->all());
        return ResponseService::success(new SettingResource($setting));
    }

    public function change_logo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        $setting = Settings::where('key', Settings::default_key())->first();
        try {
            if ($setting != null && isset($request->logo)) {
                $image = $request->logo;
                $dir = "assets/settings/images";
                $filetomove = $setting->id . "__" . time() . "__image" . "__"  . "." . $image->getClientOriginalExtension();

                $destinationPath = public_path($dir);
                $image->move($destinationPath, $filetomove);

                $setting->update([
                    'logo' => $dir . "/" . $filetomove
                ]);
            }
        } catch (\Throwable $th) {
            return ResponseService::error("Product created successfully", 500,);
        }

        return ResponseService::success(new SettingResource($setting));
    }
}
