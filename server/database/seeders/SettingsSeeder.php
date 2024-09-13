<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Settings::create([
            'key' => Settings::default_key(), // DEFAULT_SETTINGS
            'about_us' => "<p>A PROPOS DE NOUS<br>Nous sommes une entreprise de promotion immobili&egrave;re sise &agrave; Abidjan Cocody Angr&eacute;,<br>sp&eacute;cialis&eacute; dans la mise en relation immobili&egrave;res, la promotion et la valorisation de biens<br>immobiliers.<br>Nous offrons, pour vos besoins de logement, une liste infinie de biens immobiliers<br>disponible en vente ou en location partout en C&ocirc;te d&rsquo;ivoire.<br>Nous facilitons vos recherche en vous proposant ceux adopter &agrave; vos besoins en un clic.<br>Pour les D&eacute;marcheurs, Propri&eacute;taires de biens ou Agences&hellip; Nous vous favorisons,<br>une plus large diffusion vos annonces de :<br>-<br>-<br>-<br>Location<br>R&eacute;servations<br>Et de Vente<br>Nous faisons la promotion et la valorisation de vos biens immobiliers aupr&egrave;s de plusieurs<br>clients potentiels par jour (locataires / acheteurs) qui correspondent &agrave; vos crit&egrave;res.<br>NB : Entreprise ou Particulier, vous avez aussi la possibilit&eacute; de nous contacter pour la<br>mise en location, en r&eacute;servations ou en vente de vos biens immobiliers sur notre site en<br>ligne.<br>Prestation en ligne :<br>-<br>-<br>-<br>-<br>-<br>-<br>Cr&eacute;ation de contenu<br>Recherche de nouveau clients<br>Attirer plus de potentiel client et fid&eacute;lisation<br>Gestion du compte et de la base de donn&eacute;es client&egrave;les<br>Suivie et mise &agrave; jour de chaque compte<br>Enregistrement et traitement de nouvelle demande.<br>Nous mettrons tous les moyens en &oelig;uvre afin de satisfaire nos clients dans leurs<br>recherches de bien immobilier<br>Nous offrons une plus large diffusion des biens qui nous sont confi&eacute;s. N&rsquo;h&eacute;sitez pas &agrave;<br>nous contactez au 07 59 85 55 44 de 08h &agrave; 21h pour plus d&rsquo;information.</p>"
        ]);
    }
}
