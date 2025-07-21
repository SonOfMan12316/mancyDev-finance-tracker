import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { queryClient } from "../../App";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  UserCredential,
} from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  message?: string;
}

export const useAuth = () => {
  const signUpMutation: UseMutationResult<
    AuthResponse,
    Error,
    { email: string; password: string }
  > = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const userCredential: UserCredential =
          await createUserWithEmailAndPassword(auth, email, password);
        return {
          success: true,
          user: userCredential.user,
          message: "Account created successfully!",
        };
      } catch (error: unknown) {
        let errorMessage = "An error occurred during sign up.";

        if (error instanceof Error && "code" in error) {
          switch (error.code) {
            case "auth/email-already-in-use":
              errorMessage = "Email already in use.";
              break;
            case "auth/invalid-email":
              errorMessage = "Invalid email address.";
              break;
            case "auth/weak-password":
              errorMessage = "Password should be at least 8 characters.";
              break;
          }
        }

        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const loginMutation: UseMutationResult<
    AuthResponse,
    Error,
    { email: string; password: string }
  > = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return {
          success: true,
          user: userCredential.user,
          message: "Logged in successfully!",
        };
      } catch (error: unknown) {
        let errorMessage = "";

        if (error instanceof Error && "code" in error) {
          switch (error.code) {
            case "auth/user-not-found":
            case "auth/invalid-credential":
              errorMessage = "Invalid email or password.";
              break;
            case "auth/too-many-requests":
              errorMessage = "Too many attempts. Account temporarily locked.";
              break;
            case "auth/user-disabled":
              errorMessage = "Account disabled";
              break;
          }
        }

        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const resetPasswordMutation: UseMutationResult<AuthResponse, Error, string> =
    useMutation({
      mutationFn: async (email) => {
        try {
          await sendPasswordResetEmail(auth, email);
          return {
            success: true,
            message: "Password reset email sent!",
          };
        } catch (error: unknown) {
          let errorMessage = "Failed to send reset email.";

          if (error instanceof Error && "code" in error) {
            if (error.code === "auth/user-not-found") {
              errorMessage = "No account found with this email.";
            }
          }

          throw new Error(errorMessage);
        }
      },
    });

  return {
    signUp: signUpMutation,
    login: loginMutation,
    resetPassword: resetPasswordMutation,
  };
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        });
      });
    },
  });
};
