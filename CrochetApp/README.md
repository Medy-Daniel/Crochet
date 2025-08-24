# CrochetApp - Votre Compagnon Crochet & Tricot 🧶

Une application React Native révolutionnaire pour les passionnés de crochet et tricot, inspirée de "My Row Counter" avec des fonctionnalités avancées.

## 🎯 Fonctionnalités Principales

### ✅ Implémentées
- **Compteur de rangs intelligent** avec gros boutons intuitifs (+/-)
- **Système d'authentification** (inscription/connexion)
- **Dashboard projets** avec suivi de progression
- **Profil utilisateur** avec système de niveaux XP
- **Navigation fluide** avec animations
- **Interface moderne** avec TailwindCSS

### 🚧 À Développer
- Gestion complète des projets (CRUD)
- Système premium vs gratuit
- Tutoriels vidéo interactifs
- Suivi caméra/vidéo avec IA
- Statistiques avancées
- Thèmes personnalisables
- Sauvegarde cloud (Supabase)

## 🏗️ Architecture

### Frontend
- **React Native** avec Expo
- **TypeScript** pour la sécurité des types
- **TailwindCSS** (NativeWind) pour le styling
- **React Navigation** pour la navigation
- **Structure modulaire** scalable

### Backend Recommandé
- **Supabase** (PostgreSQL + Auth + Storage + Real-time)
- **Authentification** OAuth + email/password
- **Base de données** PostgreSQL avec RLS
- **Storage** pour vidéos et images
- **API** auto-générée REST/GraphQL

## 📁 Structure du Projet

```
CrochetApp/
├── components/           # Composants réutilisables
│   ├── common/          # Boutons, Cards, ProgressBar
│   ├── counters/        # Compteur de rangs
│   ├── forms/           # Formulaires
│   └── navigation/      # Navigation personnalisée
├── screens/             # Écrans de l'app
│   ├── auth/           # Authentification
│   ├── dashboard/      # Tableau de bord
│   ├── project/        # Gestion projets
│   ├── profile/        # Profil utilisateur
│   └── tutorial/       # Tutoriels
├── services/            # Services externes
│   ├── api/            # Appels API
│   ├── auth/           # Authentification
│   └── storage/        # Stockage local
├── contexts/            # Context React
├── hooks/              # Hooks personnalisés
├── types/              # Types TypeScript
├── constants/          # Constantes et couleurs
└── utils/              # Fonctions utilitaires
```

## 🚀 Installation & Démarrage

```bash
cd CrochetApp
npm install
npm start
```

### Pour iOS (nécessite macOS)
```bash
npm run ios
```

### Pour Android
```bash
npm run android
```

### Pour Web
```bash
npm run web
```

## 🎨 Design System

### Couleurs
- **Primary**: Bleus (branding principal)
- **Secondary**: Violets (accents)
- **Accent**: Oranges (CTA, alertes)
- **Grays**: Interface, textes

### Composants
- **Button**: Variants (primary, secondary, outline, ghost)
- **Card**: Containers avec shadow
- **ProgressBar**: Suivi progression
- **RowCounter**: Compteur principal avec gros boutons

## 📱 Optimisations Apple Store

### Conformité iOS
- **Bundle ID**: `com.crochetapp.app`
- **Permissions**: Caméra, Photos, Microphone
- **Category**: Lifestyle
- **Orientations**: Portrait uniquement
- **Assets**: Icons, Splash optimisés

### Performance
- **New Architecture** Expo activée
- **TypeScript** pour la stabilité
- **Composants optimisés** avec React.memo
- **Navigation** gesture-enabled

### Sécurité
- **Permissions explicites** avec descriptions
- **Validation** des inputs utilisateur
- **Gestion erreurs** robuste

## 🔮 Roadmap Premium

### Fonctionnalités Premium
- ✨ Tutoriels avancés exclusifs
- 📹 Suivi vidéo intelligent avec IA
- 📊 Statistiques détaillées
- ☁️ Sauvegarde cloud illimitée
- 🎨 Thèmes personnalisés
- 🆘 Support prioritaire

### Monétisation
- **Freemium**: Fonctionnalités de base gratuites
- **Premium**: 4.99€/mois ou 49.99€/an
- **IAP**: Intégration Apple/Google Pay

## 🔧 Prochaines Étapes

1. **Intégration Supabase**
   - Configuration base de données
   - Auth provider setup
   - API integration

2. **Fonctionnalités Premium**
   - Système d'abonnement
   - Paywall implementation
   - Premium features unlock

3. **IA & Caméra**
   - Computer vision setup
   - Pattern recognition
   - Tutorial tracking

4. **Store Submission**
   - App Store preparation
   - Screenshots & metadata
   - Review guidelines compliance

## 📞 Support

Pour toute question ou suggestion, contactez l'équipe de développement.

---

**CrochetApp** - Transformez votre passion en art ! 🎨✨