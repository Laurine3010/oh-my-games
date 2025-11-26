// auth.js

// 1. Importation du client Supabase
import { supabase } from './supabase-config.js';

// --- 2. Éléments du DOM (Document Object Model) ---
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const toggleLink = document.getElementById('toggle-auth');
const submitButton = document.getElementById('submit-btn');
const messageBox = document.getElementById('message-box');

// --- 3. État de l'application ---
let isSigningUp = false; // Par défaut, on est en mode Connexion

// --- 4. Fonctions d'interface utilisateur ---

/**
 * Affiche un message à l'utilisateur.
 * @param {string} message - Le message à afficher.
 * @param {boolean} isError - Si true, le message est affiché comme une erreur.
 */
function showMessage(message, isError) {
    messageBox.textContent = message;
    messageBox.className = 'message-box'; // Réinitialiser les classes
    if (isError) {
        messageBox.classList.add('error');
    } else {
        messageBox.classList.add('success');
    }
    messageBox.style.display = 'block';
    
    // Masquer le message après 5 secondes, sauf s'il s'agit d'une instruction (confirmation d'e-mail)
    if (!isError || !message.includes("confirmation")) {
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 5000);
    }
}

/**
 * Met à jour le formulaire selon le mode (Connexion ou Inscription).
 */
function updateFormState() {
    messageBox.style.display = 'none'; // Cacher les messages précédents
    if (isSigningUp) {
        // Mode Inscription
        submitButton.textContent = "S'inscrire";
        toggleLink.innerHTML = "Déjà un compte ? <a href='#'>Se connecter</a>";
        document.querySelector('.auth-container h2').textContent = 'Créer un compte';
    } else {
        // Mode Connexion
        submitButton.textContent = "Se connecter";
        toggleLink.innerHTML = "Pas encore de compte ? <a href='#'>S'inscrire</a>";
        document.querySelector('.auth-container h2').textContent = 'Connexion';
    }
}

// --- 5. Logique d'authentification Supabase (Corrigée pour l'inscription) ---

/**
 * Gère la soumission du formulaire d'authentification.
 */
async function handleAuth(e) {
    e.preventDefault();
    submitButton.disabled = true; 
    messageBox.style.display = 'none';
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showMessage("Veuillez remplir tous les champs.", true);
        submitButton.disabled = false;
        return;
    }

    if (isSigningUp) {
        // --- Mode Inscription ---
        showMessage("Inscription en cours...", false);
        
        // On capture la réponse complète pour vérifier l'utilisateur créé
        const { data, error } = await supabase.auth.signUp({ 
            email: email,
            password: password,
        });

        if (error) {
            // Afficher l'erreur retournée par Supabase (ex: 'Password should be at least 6 characters')
            showMessage(`Erreur d'inscription : ${error.message}`, true);
            
        } else if (data.user) {
            // Inscription réussie : l'objet 'user' est créé dans la BDD.
            // (La session peut être nulle si la confirmation d'email est activée)
            showMessage("Inscription réussie ! Veuillez vérifier votre e-mail pour le lien de confirmation.", false);
            
            // On repasse immédiatement en mode connexion pour la prochaine action de l'utilisateur
            isSigningUp = false; 
            updateFormState();
        } else {
            // Cas de succès inattendu ou sans user (par sécurité)
            showMessage("Inscription réussie, mais échec de la réponse. Veuillez vérifier votre e-mail pour confirmer.", false);
            isSigningUp = false; 
            updateFormState();
        }

    } else {
        // --- Mode Connexion ---
        showMessage("Connexion en cours...", false);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            showMessage(`Erreur de connexion : ${error.message}`, true);
        } else {
            // Connexion réussie
            showMessage("Connexion réussie ! Redirection vers la sélection de groupe...", false);
            setTimeout(() => {
                window.location.href = 'groupes.html'; 
            }, 1000);
            return; 
        }
    }
    
    submitButton.disabled = false; 
}

// --- 6. Vérification de la session initiale ---

/**
 * Vérifie si l'utilisateur est déjà connecté et le redirige si c'est le cas.
 */
async function checkInitialSession() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        console.log("Session active détectée. Redirection vers groupes.html.");
        window.location.href = 'groupes.html'; 
    } else {
        updateFormState(); // Initialiser l'interface en mode connexion si non connecté
    }
}

// --- 7. Écouteurs d'événements (Lancement) ---

// Basculer entre connexion et inscription
toggleLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    isSigningUp = !isSigningUp;
    updateFormState();
});

// Gérer la soumission du formulaire
authForm.addEventListener('submit', handleAuth);

// Lancer la vérification de session au chargement de la page
document.addEventListener('DOMContentLoaded', checkInitialSession);