import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  UserCredential
} from "../../firebase"

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  message?: string;
}

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return { 
      success: true, 
      user: userCredential.user,
      message: "Account created successfully!" 
    };
  } catch (error: unknown) {
    let errorMessage = "An error occurred during sign up.";
    
    if (error instanceof Error && 'code' in error) {
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Email already in use.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters.";
          break;
      }
    }
    
    return { success: false, error: errorMessage };
  }
};


export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return { 
      success: true, 
      user: userCredential.user,
      message: "Logged in successfully!" 
    };
  } catch (error: unknown) {
    let errorMessage = "An error occurred during login.";
    
    if (error instanceof Error && 'code' in error) {
      switch(error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = "Invalid email or password.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many attempts. Account temporarily locked.";
          break;
      }
    }
    
    return { success: false, error: errorMessage };
  }
};


export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { 
      success: true, 
      message: "Password reset email sent!" 
    };
  } catch (error: unknown) {
    let errorMessage = "Failed to send reset email.";
    
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      }
    }
    
    return { success: false, error: errorMessage };
  }
};

export const logout = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    return { success: true, message: "Signed out successfully!" };
  } catch (error: unknown) {
    return { 
      success: false, 
      error: "Failed to sign out." 
    };
  }
};