<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;
use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index()
    {
        return ResponseService::success(Contact::all(), 'contact list');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        // Enregistrer les données du contact dans la base de données
        $contact = new Contact();
        $contact->name = $request->input('name');
        $contact->email = $request->input('email');
        $contact->message = $request->input('message');
        $contact->save();

        try {
            Mail::to(Env('ADMIN_MAIL'))->send(new ContactMail($contact));
        } catch (\Throwable $th) {
        }

        return response()->json(['message' => 'Votre message a été envoyé avec succès!'], 200);
    }

    public function deleteContact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:contacts,id',
        ]);

        if ($validator->fails()) {
            return ResponseService::error("Erreur d'enregistrement", 422, $validator->errors());
        }

        $contact = Contact::find($request->input('id'));
        $contact->delete();
    }
}
