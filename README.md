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

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Vite** pour le build et le serveur de développement
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` : Démarre le serveur de développement HTTPS
- `npm run build` : Build de production
- `npm run preview` : Prévisualisation du build en HTTPS
- `npm run lint` : Vérification du code avec ESLint

## 🔐 Configuration SSL

L'application utilise des certificats SSL personnalisés pour le développement HTTPS.

### Génération des certificats

Les certificats SSL ont été générés automatiquement dans le dossier `certs/` :
- `certs/key.pem` : Clé privée
- `certs/cert.pem` : Certificat auto-signé

### Domaines supportés

Les certificats sont configurés pour :
- `magic.red-ark.com`
- `localhost`
- `127.0.0.1`

## 🌐 Accès

- **Local HTTPS** : https://localhost:5173
- **Domaine HTTPS** : https://magic.red-ark.com:5173 (si configuré dans /etc/hosts)
- **Réseau HTTPS** : https://[votre-ip]:5173

⚠️ **Note HTTPS** : Le navigateur affichera un avertissement de sécurité car nous utilisons des certificats auto-signés. Cliquez sur "Avancé" puis "Continuer vers localhost" pour accéder à l'application.

### Configuration du domaine local (optionnel)

Pour utiliser `magic.red-ark.com` en local, ajoutez cette ligne à votre fichier `/etc/hosts` :
```
127.0.0.1 magic.red-ark.com
```

## 📋 Structure du Projet

```
src/
├── components/          # Composants React
├── contexts/           # Contextes React (Theme)
├── data/              # Données mockées
├── types/             # Types TypeScript
├── utils/             # Utilitaires et helpers
└── App.tsx            # Composant principal

certs/                 # Certificats SSL (ignorés par Git)
├── key.pem           # Clé privée
└── cert.pem          # Certificat auto-signé
```

## 🔒 Sécurité

- Les certificats SSL sont ignorés par Git pour des raisons de sécurité
- Utilisez des certificats valides en production
- Les certificats auto-signés sont uniquement pour le développement

---

**Note** : Cette application est en phase de développement (MVP R01 Alpha).