import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import OnboardingLayout from '../layout/OnboardingLayout'
import Input from '../ui/Input/Input'
import { Button } from '../ui/Button/Button'
import { useAuth } from '../../api/helper/authService'
import { EyeClose, EyeOpen } from '../icons'

interface ResetPasswordForm {
  oobCode: string
  newPassword: string
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [passwordType, setPasswordType] = useState<string>('password')

  const { resetPassword } = useAuth()
  const params = new URLSearchParams(location.search)
  const oobCode = params.get('oobCode')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>()

  const handleResetPassword: SubmitHandler<ResetPasswordForm> = async (
    data: ResetPasswordForm
  ) => {
    if (!oobCode) {
      toast.error('Invalid or missing reset code.', {
        id: 'reset-password-error',
      })
      return
    }
    resetPassword.mutate(
      { oobCode, newPassword: data.newPassword },
      {
        onSuccess: (data) => {
          toast.success(data?.message ?? 'Password has been reset!', {
            id: 'reset-password-success',
          })
          navigate('/sign-in')
        },
        onError: (error: any) => {
          toast.error(error.message, { id: 'reset-password-error' })
        },
      }
    )
  }

  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="form bg-white rounded-xl px-4 pt-6 md:pb-4 md:px-8 lg:pt-7"
        >
          <h2 className="text-2xl font-bold mb-5 md:mb-7">Reset Password</h2>
          <div className="mt-3">
            <Input
              typeOfInput="normal"
              variant="primary"
              label="password"
              placement="end"
              icon={
                passwordType === 'text' ? (
                  <EyeOpen
                    className="cursor-pointer"
                    onClick={() => {
                      setPasswordType('password')
                    }}
                  />
                ) : (
                  <EyeClose
                    className="cursor-pointer"
                    onClick={() => {
                      setPasswordType('text')
                    }}
                  />
                )
              }
              type={passwordType}
              {...register('newPassword', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'New Password cannot be less than 8 characters',
                },
              })}
            />
            {errors.newPassword && (
              <span role="alert" className="text-xs text-right text-ch-danger">
                {errors.newPassword?.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="my-7 flex items-center justify-center"
            size="sm"
            disabled={resetPassword.isPending}
          >
            {resetPassword.isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </OnboardingLayout>
  )
}

export default ResetPassword
