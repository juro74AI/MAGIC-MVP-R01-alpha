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
sudo npm run dev
```

## 🔧 Scripts Disponibles

- `sudo npm run dev` : Démarre le serveur de développement HTTPS sur le port 443
- `npm run build` : Build de production
- `sudo npm run preview` : Prévisualisation du build en HTTPS sur le port 443
- `npm run lint` : Vérification du code avec ESLint

⚠️ **Note importante** : Le port 443 nécessite des privilèges administrateur, d'où l'utilisation de `sudo`.

## 🔐 Configuration SSL

L'application utilise des certificats SSL personnalisés pour le développement HTTPS sur le port 443 (port HTTPS standard).

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

- **Local HTTPS** : https://localhost (port 443 par défaut)
- **Domaine HTTPS** : https://magic.red-ark.com (si configuré dans /etc/hosts)
- **Réseau HTTPS** : https://[votre-ip]

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
- Le port 443 nécessite des privilèges administrateur

## 🚨 Privilèges Administrateur

Le port 443 étant un port privilégié (< 1024), vous devez :

### Sur Linux/macOS :
```bash
sudo npm run dev
```

### Sur Windows (PowerShell en tant qu'administrateur) :
```bash
npm run dev
```

### Alternative sans sudo

Si vous préférez éviter sudo, vous pouvez :
1. Utiliser un port non-privilégié comme 8443
2. Configurer un reverse proxy (nginx, Apache)
3. Utiliser des outils comme `authbind` sur Linux

---

**Note** : Cette application est en phase de développement (MVP R01 Alpha).