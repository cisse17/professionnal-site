import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Résoudre __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossier de build Vite
const buildPath = path.join(__dirname, 'dist');

// Servir les fichiers statiques de Vite
app.use(express.static(buildPath));


app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Frontend is running at http://localhost:${PORT}`);
});














// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Chemin vers les fichiers build (Vite génère le dossier 'dist')
// const buildPath = path.join(__dirname, 'dist');

// // Servir les fichiers statiques
// app.use(express.static(buildPath));

// // Rediriger toutes les routes vers index.html (pour une SPA React)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// // Lancer le serveur
// app.listen(PORT, () => {
//   console.log(`✅ Frontend is running at http://localhost:${PORT}`);
// });
