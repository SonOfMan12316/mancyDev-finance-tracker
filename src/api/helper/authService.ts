import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../App'
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  UserCredential,
} from '../../firebase'
import {
  onAuthStateChanged,
  updateProfile,
  confirmPasswordReset,
} from 'firebase/auth'

interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  message?: string
}

export const useAuth = () => {
  const signUpMutation: UseMutationResult<
    AuthResponse,
    Error,
    { name: string; email: string; password: string }
  > = useMutation({
    mutationFn: async ({ name, email, password }) => {
      try {
        const userCredential: UserCredential =
          await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        await updateProfile(user, {
          displayName: name,
        })

        return {
          success: true,
          message: 'Account created successfully!',
        }
      } catch (error: unknown) {
        let errorMessage = 'An error occurred during sign up.'

        if (error instanceof Error && 'code' in error) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'Email already in use.'
              break
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address.'
              break
            case 'auth/weak-password':
              errorMessage = 'Password should be at least 8 characters.'
              break
          }
        }

        throw new Error(errorMessage)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

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
        )
        return {
          success: true,
          user: userCredential.user,
          message: 'Logged in successfully!',
        }
      } catch (error: unknown) {
        let errorMessage = ''

        if (error instanceof Error && 'code' in error) {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
              errorMessage = 'Invalid email or password.'
              break
            case 'auth/too-many-requests':
              errorMessage = 'Too many attempts. Account temporarily locked.'
              break
            case 'auth/user-disabled':
              errorMessage = 'Account disabled'
              break
          }
        }

        throw new Error(errorMessage)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const forgotPasswordMutation: UseMutationResult<AuthResponse, Error, string> =
    useMutation({
      mutationFn: async (email) => {
        try {
          await sendPasswordResetEmail(auth, email)
          return {
            success: true,
            message: 'Password reset email sent!',
          }
        } catch (error: unknown) {
          let errorMessage = 'Failed to send reset email. Please try again.'

          if (error instanceof Error && 'code' in error) {
            switch (error.code) {
              case 'auth/user-not-found':
                errorMessage = 'No account found with this email address.'
                break
              case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.'
                break
              case 'auth/too-many-requests':
                errorMessage = 'Too many attempts. Please try again later.'
                break
              case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection.'
                break
              default:
                errorMessage = 'An unexpected error occurred. Please try again.'
            }
          }

          throw new Error(errorMessage)
        }
      },
    })

  const resetPasswordMutation: UseMutationResult<
    AuthResponse,
    Error,
    { oobCode: string; newPassword: string }
  > = useMutation({
    mutationFn: async ({ oobCode, newPassword }) => {
      try {
        await confirmPasswordReset(auth, oobCode, newPassword)
        return {
          success: true,
          message: 'Password has been reset successfully!',
        }
      } catch (error: unknown) {
        let errorMessage = 'Failed to reset password. Please try again.'
        if (error instanceof Error && 'code' in error) {
          switch (error.code) {
            case 'auth/expired-action-code':
              errorMessage =
                'The reset link has expired. Please request a new one.'
              break
            case 'auth/invalid-action-code':
              errorMessage =
                'The reset link is invalid. Please request a new one.'
              break
            case 'auth/weak-password':
              errorMessage = 'Password should be at least 8 characters.'
              break
            case 'auth/network-request-failed':
              errorMessage = 'Network error. Please check your connection.'
              break
            default:
              errorMessage = 'An unexpected error occurred. Please try again.'
          }
        }
        throw new Error(errorMessage)
      }
    },
  })

  return {
    signUp: signUpMutation,
    login: loginMutation,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
  }
}

export const logoutUser = async (): Promise<void> => {
  await signOut(auth)
}

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: () =>
      new Promise((resolve) => {
        let isMounted = true

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (isMounted) {
            resolve(user)
            queryClient.setQueryData(['user'], user)
          }
        })

        return () => {
          isMounted = false
          unsubscribe()
        }
      }),
  })
}
