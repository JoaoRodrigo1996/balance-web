'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { AuthContext } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const logInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type logInBodySchemaFormData = z.infer<typeof logInBodySchema>

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<logInBodySchemaFormData>({
    resolver: zodResolver(logInBodySchema),
  })

  const { toast } = useToast()

  async function handleSignIn(data: logInBodySchemaFormData) {
    try {
      await signIn(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possível efetuar o login',
        description: 'Senha e ou E-mail inválidos. Tente novamente mais tarde.',
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-medium">Entre na sua conta</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Coloque seu email and password bellow to enter your account
        </p>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="w-full space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" id="email" {...register('email')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" {...register('password')} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Log In
          </Button>
        </form>
        <div className="mt-2 flex items-center gap-2 text-zinc-200">
          <span className="text-sm">Ainda não tem uma conta?</span>
          <Link href="/signup" className="text-sm capitalize hover:underline">
            create now!
          </Link>
        </div>
      </div>
    </div>
  )
}
