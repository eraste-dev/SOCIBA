import React, { FC } from "react";

const CguPage: FC = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6 text-center">Conditions Générales d'Utilisation</h1>
			<div className="space-y-6 text-justify leading-relaxed">
				<section>
					<h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
					<p>
						Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site internet de BAJORAH (ci-après dénommé "www.bajorah.com"). En accédant et en utilisant le site, vous acceptez d'être lié par les présentes CGU.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">2. Objet du Site</h2>
					<p>
						Le Site a pour vocation de fournir des informations et des services liés à la promotion immobilière, y compris la présentation de biens immobiliers à vendre ou à louer, des conseils en immobilier, et d'autres services connexes.
					</p>
				</section>

				{/* Continuez à ajouter le reste des sections de la même manière */}
				<section>
					<h2 className="text-2xl font-semibold mb-2">3. Accès au Site</h2>
					<p>
						L'accès au Site est gratuit, mais certaines sections peuvent être restreintes aux utilisateurs enregistrés ou aux clients de BAJORAH. Vous êtes responsable de veiller à ce que votre équipement informatique soit conforme et sécurisé pour accéder au Site.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">4. Inscription et Compte Utilisateur</h2>
					<p>
						Pour accéder à certains services, vous pouvez être amené à créer un compte. Vous vous engagez à fournir des informations exactes lors de la création de ce compte et à maintenir ces informations à jour. Vous êtes seul responsable de la confidentialité de vos identifiants de connexion et de toute activité réalisée sous votre compte.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">5. Protection des Données Personnelles</h2>
					<p>
						Nous collectons et traitons les données personnelles conformément à notre <a href="/politique-de-confidentialite" className="text-blue-500 underline">Politique de Confidentialité</a>. Vous avez le droit d'accéder, de modifier, ou de demander la suppression de vos données personnelles, en nous contactant via les informations fournies dans cette politique.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">6. Propriété Intellectuelle</h2>
					<p>
						Tout le contenu du site (textes, images, logos, vidéos, etc.) est protégé par des droits d'auteur et autres droits de propriété intellectuelle. Vous vous engagez à ne pas reproduire, modifier, ou distribuer le contenu du site sans notre autorisation préalable.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">7. Utilisation du Site</h2>
					<p>
						Vous vous engagez à utiliser le site uniquement à des fins légales et conformément aux présentes CGU. Il est strictement interdit de :
					</p>
					<ul className="list-disc ml-4">
						<li>Publier des informations fausses ou trompeuses.</li>
						<li>Publier des annonces qui ne sont pas en rapports avec l'immobilier.</li>
						<li>Télécharger ou transmettre des virus ou tout autre programme malveillant.</li>
						<li>Usurper l'identité d'une autre personne ou entité.</li>
						<li>Interférer avec le fonctionnement du site ou des serveurs associés.</li>
					</ul>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-2">8. Responsabilité</h2>
					<p>
						BAJORAH met tout en œuvre pour garantir l'exactitude des informations présentes sur le site. Cependant, nous ne pouvons garantir que ces informations soient toujours complètes ou à jour. Nous ne procédons ni de biens et ne sommes ni propriétaire de biens, nous ne sommes donc pas responsables des dommages directs ou indirects pouvant résulter de l'utilisation du site. Nous vous exhortons à faire preuve de vigilance lors de l’acquisition d’un bien.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">9. Liens Externes</h2>
					<p>
						Le site peut contenir des liens vers des sites tiers. BAJORAH n'a aucun contrôle sur ces sites et ne saurait être tenue responsable de leur contenu, politique de confidentialité ou pratiques.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">10. Modification des CGU</h2>
					<p>
						Nous nous réservons le droit de modifier ces CGU à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. En continuant d'utiliser le site après de telles modifications, vous acceptez les nouvelles conditions.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">11. Droit Applicable et Juridiction</h2>
					<p>
						Les présentes CGU sont régies par les lois de la côte d'ivoire. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux d'Abidjan.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-2">12. Contact</h2>
					<p>
						Pour toute question concernant ces CGU ou l'utilisation du site, vous pouvez nous contacter à l'adresse suivante :{" "}
						<a href="mailto:immobilier@bajorah.com" className="text-blue-500 underline">immobilier@bajorah.com</a>.
					</p>
				</section>
			</div>
		</div>
	);
};

export default CguPage;
