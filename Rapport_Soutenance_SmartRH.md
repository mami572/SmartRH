# RAPPORT DE SOUTENANCE
## Projet de Fin d'Études (PI 2026)

---

# PAGE DE GARDE

**Titre du projet :** SmartRH – Plateforme Web de Gestion des Ressources Humaines pour PME

**Type :** Projet Informatique – Application Web

**Auteurs :**

- Mouhameden Mohamed Zein Mohamed El Mamy (24063)
- Med Mahmoude (24149)

**Encadrant :** Chaikanie Seyed

**Établissement :** ENSUP (Information Technology)  
**Année académique :** 2025 – 2026

---

# Remerciements

Nous exprimons nos sincères remerciements à notre encadrant **M. Chaikanie Seyed** pour son accompagnement, ses conseils techniques et son soutien durant toute la réalisation de ce projet.

Nous remercions également l’ensemble du corps pédagogique de l'ENSUP pour la qualité de la formation dispensée durant notre parcours académique.

Enfin, nous remercions nos familles et nos collègues pour leur soutien moral et leur encouragement.

---

# Résumé

Dans un contexte de transformation numérique des entreprises, la gestion des ressources humaines nécessite des solutions modernes permettant d'améliorer l'efficacité organisationnelle.

Le projet **SmartRH** est une application web destinée aux petites et moyennes entreprises (PME). Elle permet de centraliser et automatiser les principales opérations RH telles que :

- la gestion des employés
- la gestion des congés
- la gestion des salaires (édition des bulletins de paie)
- la gestion des formations
- la visualisation des indicateurs RH via un tableau de bord

La solution repose sur une architecture **Full-Stack moderne basée sur Next.js, Prisma et PostgreSQL**, garantissant performance, sécurité et évolutivité.

---

# Abstract

In the context of digital transformation, companies require modern tools to manage human resources efficiently.

**SmartRH** is a web application designed for small and medium-sized enterprises (SMEs). It centralizes HR processes such as employee management, payroll management, leave requests, and training tracking.

The system is built using a modern **Full-Stack architecture based on Next.js, Prisma ORM, and PostgreSQL**, ensuring scalability, performance, and security.

---

# Table des matières

1. [Introduction](#1-introduction)
2. [Présentation Générale du Projet](#2-présentation-générale-du-projet)
3. [Étude et Analyse du Besoin](#3-étude-et-analyse-du-besoin)
4. [Méthodologie de Développement](#4-méthodologie-de-développement)
5. [Conception du Système](#5-conception-du-système)
6. [Réalisation Technique](#6-réalisation-technique)
7. [Tests et Validation](#7-tests-et-validation)
8. [Déploiement et Mise en Production](#8-déploiement-et-mise-en-production)
9. [Perspectives d'Évolution](#9-perspectives-dévolution)
10. [Conclusion](#10-conclusion)
11. [Bibliographie](#11-bibliographie)

---

# 1. Introduction

La transformation numérique des organisations a profondément modifié les méthodes de gestion des ressources humaines. Les entreprises doivent aujourd'hui gérer un volume important de données liées aux employés, aux salaires, aux formations et aux congés.

Cependant, de nombreuses PME utilisent encore des méthodes traditionnelles telles que les fichiers Excel ou les dossiers papier, ce qui entraîne :

- une dispersion de l'information
- un manque de traçabilité
- des risques d'erreurs administratives

Dans ce contexte, le projet **SmartRH** vise à développer une solution informatique permettant de centraliser et automatiser les processus RH au sein d'une organisation.

---

# 2. Présentation Générale du Projet

## 2.1 Objectifs du projet

Les principaux objectifs du projet SmartRH sont :

- **Centraliser** les informations des employés au sein d'une base de données unique.
- **Automatiser** les flux de travail RH (demandes de congés, calcul des salaires).
- **Améliorer** la prise de décision grâce à des indicateurs RH (KPIs) visuels.
- **Simplifier** la communication et la transparence entre employés, managers et service RH.

## 2.2 Public cible

La plateforme est destinée principalement aux :

- PME (Petites et Moyennes Entreprises)
- Startups en phase de croissance
- Organisations de taille moyenne souhaitant digitaliser leurs processus.

---

# 3. Étude et Analyse du Besoin

## 3.1 Contexte

Les petites entreprises rencontrent souvent plusieurs difficultés dans la gestion des ressources humaines dues à l'absence d’outils spécialisés et au manque d’automatisation. La gestion manuelle devient chronophage et sujette aux erreurs à mesure que l'effectif grandit.

## 3.2 Problématique

**Comment concevoir une plateforme numérique intégrée capable de simplifier et automatiser efficacement la gestion des ressources humaines dans une PME ?**

## 3.3 Solution proposée

La solution consiste à développer une plateforme web intégrée offrant des fonctionnalités personnalisées par rôles (Admin, Manager, Employé) pour gérer :

- Le cycle de vie des employés
- La configuration hiérarchique (Grades) et salariale
- Le cycle des congés et absences
- Le plan de développement des compétences (Formations)

---

# 4. Méthodologie de Développement

Pour le développement de SmartRH, nous avons adopté une **méthodologie Agile (Scrum)** permettant :

- Un développement progressif par itérations (sprints).
- Une adaptation rapide aux retours utilisateurs.
- Une amélioration continue de la qualité du code.

Les principales étapes du projet ont suivi le cycle classique du génie logiciel :
1. Analyse fonctionnelle et technique
2. Conception architecturale (UML & Schéma BD)
3. Développement Full-Stack (Frontend & Backend simultané)
4. Tests unitaires et d'intégration
5. Déploiement et Documentation

---

# 5. Conception du Système

## 5.1 Architecture logicielle

L’application suit une architecture **Full Stack moderne** tirant parti des dernières avancées du JavaScript.

**Architecture générale :**
Utilisateur (Browser) ↔ Interface Web (React / Next.js) ↔ API Backend (Next.js Server Actions/Routes) ↔ ORM Prisma ↔ Base de données PostgreSQL/MySQL

## 5.2 Diagramme des modules

Les principaux modules de SmartRH sont interconnectés :

- **Module Authentification & Sécurité :** Gestion des sessions et accès par rôles.
- **Module Gestion du Personnel :** Création et suivi des fiches employés.
- **Module Structure Salariale :** Gestion des grades, salaires de base et primes.
- **Module Congés :** Circuit de demande, validation et calcul du solde restant.
- **Module Paie :** Génération des bulletins mensuels.
- **Module Formations :** Catalogue et suivi des participations.

---

# 6. Réalisation Technique

## 6.1 Technologies utilisées

### Frontend
- **React 18 & Next.js 13+ :** Framework robuste pour le SSR et le routage.
- **Tailwind CSS 4 :** Pour un design Premium et responsive.
- **Shadcn UI & Radix UI :** Bibliothèque de composants accessibles et design.

### Backend
- **Next.js API Routes :** Pour les endpoints serveurs.
- **Prisma ORM :** Pour une interaction typée et sécurisée avec la base de données.
- **Node.js :** Environnement d'exécution.

### Base de données
- **PostgreSQL / MySQL :** Stockage relationnel fiable.

### Authentification & Sécurité
- **NextAuth / JWT :** Protection des routes et gestion des identités.
- **Bcrypt :** Hachage des mots de passe.

---

## 6.2 Fonctionnalités principales

### Gestion des employés
Outil complet permettant d'ajouter, modifier, consulter (fiches détaillées) et archiver les informations des collaborateurs.

### Gestion des congés
Interface intuitive permettant l'envoi de demandes avec notification automatique au manager, qui peut alors approuver ou refuser selon le calendrier de l'équipe.

### Tableau de bord RH (Dashboard)
Visualisation dynamique via des graphiques (Recharts) des indicateurs clés : effectifs par département, état de la paie mensuelle, et alertes de congés.

---

# 7. Tests et Validation

Plusieurs phases de tests ont été réalisées afin de garantir la robustesse de SmartRH :

- **Tests fonctionnels :** Vérification de chaque action utilisateur (ex: soumission de formulaire).
- **Tests d'interface (UI) :** Garantie de la réactivité sur mobile et tablette.
- **Tests de données :** Validation de l'intégrité référentielle en base de données via Prisma.

Les résultats confirment que la plateforme répond aux exigences du cahier des charges initial.

---

# 8. Déploiement et Mise en Production

Le projet SmartRH est optimisé pour le cloud :

- **Hébergement Frontend/API :** Vercel (pour sa performance native avec Next.js).
- **Base de Données :** Railway ou Render (Serverless PostgreSQL).
- **CI/CD :** Pipeline automatisé via GitHub Actions pour chaque déploiement.

---

# 9. Perspectives d’Évolution

Le projet est conçu pour être évolutif :

- **Extension Mobile :** Portabilité vers une application mobile Native.
- **Module Recrutement :** Suivi des candidats et gestion des entretiens.
- **Analyse IA :** Module de prédiction du turn-over et recommandations de formations.
- **Signatures Électroniques :** Pour les contrats et bulletins de paie.

---

# 10. Conclusion

Le projet **SmartRH** constitue une solution concrète et moderne pour la digitalisation des RH dans les PME.

Ce travail de fin d'études nous a permis de consolider nos connaissances en développement Full-Stack et en gestion de projet technique. Nous avons réussi à concevoir un outil qui allie esthétique premium et robustesse technique, prêt pour une utilisation réelle en entreprise.

---

# 11. Bibliographie

1. **Next.js Documentation** - https://nextjs.org/docs
2. **Prisma ORM Documentation** - https://www.prisma.io/docs
3. **React.js Official Docs** - https://react.dev
4. **PostgreSQL Manual** - https://www.postgresql.org/docs
5. **Tailwind CSS Documentation** - https://tailwindcss.com/docs
