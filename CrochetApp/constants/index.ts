export * from './colors';

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
} as const;

export const USER_LEVELS = [
  { level: 1, name: 'Débutant', xpRequired: 0 },
  { level: 2, name: 'Débutant', xpRequired: 100 },
  { level: 3, name: 'Débutant', xpRequired: 250 },
  { level: 4, name: 'Intermédiaire', xpRequired: 500 },
  { level: 5, name: 'Intermédiaire', xpRequired: 750 },
  { level: 6, name: 'Intermédiaire', xpRequired: 1000 },
  { level: 7, name: 'Avancé', xpRequired: 1500 },
  { level: 8, name: 'Avancé', xpRequired: 2000 },
  { level: 9, name: 'Avancé', xpRequired: 3000 },
  { level: 10, name: 'Expert', xpRequired: 5000 },
] as const;

export const XP_REWARDS = {
  ROW_COMPLETED: 5,
  PROJECT_COMPLETED: 50,
  TUTORIAL_COMPLETED: 25,
  FIRST_PROJECT: 100,
  DAILY_LOGIN: 10,
} as const;

export const PREMIUM_FEATURES = [
  'Tutoriels avancés exclusifs',
  'Suivi vidéo intelligent',
  'Statistiques détaillées',
  'Sauvegarde cloud illimitée',
  'Thèmes personnalisés',
  'Support prioritaire',
] as const;