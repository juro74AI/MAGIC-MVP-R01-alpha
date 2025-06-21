# MAGIC-MVP-R01-alpha

## My Application Governance Information and Compliance

Une application web moderne pour la gestion et la gouvernance des applications d'entreprise.

## 🚀 Fonctionnalités

- **Dashboard** : Vue d'ensemble des applications et métriques de conformité
- **Gestion des Applications** : Création, modification et suivi des applications
- **Conformité IAM** : Suivi de la conformité en matière de gestion des identités
- **Sécurité** : Monitoring des vulnérabilités de sécurité
- **Mode Sombre** : Interface adaptative avec thème sombre/clair
- **Responsive** : Design adaptatif pour tous les appareils

## 🔒 Configuration HTTPS

L'application est configurée pour fonctionner en HTTPS avec un certificat auto-signé.

### Démarrage en HTTPS

```bash
npm run dev
```

L'application sera accessible sur : `https://localhost:5173`

### Certificat Auto-signé

Le certificat SSL est généré automatiquement lors du premier démarrage. Votre navigateur affichera un avertissement de sécurité car le certificat n'est pas signé par une autorité de certification reconnue.

**Pour accepter le certificat :**
1. Cliquez sur "Avancé" ou "Advanced"
2. Cliquez sur "Continuer vers localhost (non sécurisé)" ou "Proceed to localhost (unsafe)"

### Production

Pour la production, remplacez le certificat auto-signé par un certificat valide d'une autorité de certification (Let's Encrypt, etc.).

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Vite** pour le build et le serveur de développement
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **OpenSSL** pour la génération des certificats SSL

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` : Démarre le serveur de développement en HTTPS
- `npm run build` : Build de production
- `npm run preview` : Prévisualisation du build en HTTPS
- `npm run lint` : Vérification du code avec ESLint

## 🌐 Accès

- **Local** : https://localhost:5173
- **Réseau** : https://[votre-ip]:5173

## 📋 Structure du Projet

```
src/
├── components/          # Composants React
├── contexts/           # Contextes React (Theme)
├── data/              # Données mockées
├── types/             # Types TypeScript
├── utils/             # Utilitaires et helpers
└── App.tsx            # Composant principal
```

## 🔐 Sécurité

- Certificat SSL auto-signé pour le développement
- Configuration HTTPS par défaut
- Headers de sécurité configurés
- Validation des données côté client

---

**Note** : Cette application est en phase de développement (MVP R01 Alpha). Les certificats auto-signés ne doivent être utilisés qu'en développement.