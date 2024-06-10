import os

def rename_files_in_directory(directory_path):
    # Vérifie si le chemin du répertoire existe
    if not os.path.exists(directory_path):
        print(f"Le chemin {directory_path} n'existe pas.")
        return

    # Change le répertoire de travail actuel pour le répertoire spécifié
    os.chdir(directory_path)

    # Liste tous les fichiers dans le répertoire
    files = os.listdir(directory_path)

    # Initialise un compteur pour les nouveaux noms de fichiers
    counter = 1

    for filename in files:
        # Vérifie si l'élément est un fichier
        if os.path.isfile(filename):
            # Détermine l'extension du fichier
            file_extension = os.path.splitext(filename)[1]

            # Crée le nouveau nom de fichier avec un compteur
            new_filename = f"{counter}{file_extension}"

            # Renomme le fichier
            os.rename(filename, new_filename)

            # Incrémente le compteur
            counter += 1

    print(f"Renommage des fichiers dans {directory_path} terminé.")

# Spécifiez le chemin du répertoire
directory_path = "/home/eraste-dev/Téléchargements/sociba/00"

# Appelle la fonction pour renommer les fichiers
rename_files_in_directory(directory_path)