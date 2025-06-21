const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Créer le dossier certs s'il n'existe pas
const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

// Générer le certificat auto-signé avec Node.js
const forge = require('node-forge');

// Générer une paire de clés RSA
const keys = forge.pki.rsa.generateKeyPair(2048);

// Créer un certificat
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

// Définir les attributs du certificat
const attrs = [
  { name: 'countryName', value: 'FR' },
  { name: 'stateOrProvinceName', value: 'France' },
  { name: 'localityName', value: 'Paris' },
  { name: 'organizationName', value: 'MAGIC' },
  { name: 'organizationalUnitName', value: 'IT' },
  { name: 'commonName', value: 'localhost' }
];

cert.setSubject(attrs);
cert.setIssuer(attrs);

// Ajouter des extensions
cert.setExtensions([
  {
    name: 'basicConstraints',
    cA: true
  },
  {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true
  },
  {
    name: 'subjectAltName',
    altNames: [
      { type: 2, value: 'localhost' },
      { type: 2, value: 'magic.red-ark.com' },
      { type: 7, ip: '127.0.0.1' },
      { type: 7, ip: '51.38.13.125' }
    ]
  }
]);

// Signer le certificat
cert.sign(keys.privateKey);

// Convertir en PEM
const certPem = forge.pki.certificateToPem(cert);
const keyPem = forge.pki.privateKeyToPem(keys.privateKey);

// Sauvegarder les fichiers
fs.writeFileSync(path.join(certsDir, 'cert.pem'), certPem);
fs.writeFileSync(path.join(certsDir, 'key.pem'), keyPem);

console.log('✅ Certificat SSL auto-signé généré avec succès !');
console.log('📁 Fichiers créés :');
console.log('   - certs/cert.pem');
console.log('   - certs/key.pem');
console.log('🔒 Le site sera accessible en HTTPS sur :');
console.log('   - https://localhost:5173');
console.log('   - https://magic.red-ark.com:5173');