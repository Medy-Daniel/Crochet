import { supabase } from '../lib/supabase';

// Interface pour l'utilisateur
export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

// Interface pour l'inscription
export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

// Interface pour la connexion
export interface SignInData {
  email: string;
  password: string;
}

  export interface AuthResponse {
    success: boolean;
    user?: AuthUser;
    error?: string;
  }

export class AuthService {
      
  static async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName  
          }
        }
      });

    
      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

   
      if (!authData.user) {
        return {
          success: false,
          error: 'Erreur lors de la connexion au compte'
        };
      }

    
      return {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          user_metadata: authData.user.user_metadata
        }
      };

    } catch (error) {
 
      return {
        success: false,
        error: 'Problème de connexion au serveur'
      };
    }
  }
  
  static async signIn(data:SignInData):
    Promise<AuthResponse> {
        try {
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

    
      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

   
      if (!authData.user) {
        return {
          success: false,
          error: 'Erreur lors de la connexion'
        };
      }

    
      return {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          user_metadata: authData.user.user_metadata
        }
      };

    } catch (error) {
 
      return {
        success: false,
        error: 'Problème de connexion au serveur'
      };
    }
  }


  static async signOut():
  Promise<{success:boolean; error?: string}>{
    try {
         const {error} = await supabase.auth.signOut();

         if (error){
          return {
            success:false,
            error: error.message
          };
         }

         return {
          success: true
         }

        }
        catch(error){
        return  {
         success: false,
         error: 'Problème de connexion au serveur'
        };
      }
  }

  static async getCurrentUser():
  Promise<AuthUser | null >{
    try {
     
      const { data: { user }, error } = await supabase.auth.getUser();

      
      if (error) {
        console.error('Erreur getCurrentUser:', error.message);
        return null;
      }

      
      if (!user) {
        // TODO: Pas connecté, rediriger vers login
        return null;  
      }

      
      return {
        id: user.id,
        email: user.email!,
        user_metadata: user.user_metadata
      };

    } catch (error) {
      console.error('Erreur technique getCurrentUser:', error);
      return null;
    }
  }

   static onAuthStateChange(callback: (user: AuthUser | null) => void) {        
    // 🔥 ÉTAPE 1 : Écouter les changements d'état Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(        
      async (event, session) => {
        // 🎯 ÉTAPE 2 : Analyser l'événement
        console.log('Auth event:', event); // Debug

        // 🔍 ÉTAPE 3 : Extraire l'utilisateur de la session
        let user: AuthUser | null = null;

        if (session?.user) {
          // ✅ Session valide, formater l'utilisateur
          user = {
            id: session.user.id,
            email: session.user.email!,
            user_metadata: session.user.user_metadata
          };
        }
        // Sinon user reste null (déconnecté)

        // 📞 ÉTAPE 4 : Appeler le callback avec l'utilisateur
        callback(user);
      }
    );

    // 🔄 ÉTAPE 5 : Retourner la fonction de nettoyage
    return () => {
      subscription.unsubscribe();
    };
  }
  
    }