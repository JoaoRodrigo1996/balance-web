'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type SignUpBodySchemaFormData = z.infer<typeof signUpBodySchema>

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpBodySchemaFormData>({
    resolver: zodResolver(signUpBodySchema),
  })

  const router = useRouter()

  const { toast } = useToast()

  async function handleCreateAccount({
    name,
    email,
    password,
  }: SignUpBodySchemaFormData) {
    try {
      await api.post('/accounts', { name, email, password })
      toast({
        variant: 'default',
        title: 'Conta criada!',
        description: 'Sua conta foi criada com sucesso.',
        duration: 2000,
      })
      router.push('/')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Não foi possível criar uma conta.',
        description: 'Não foi possível criar uma conta. Tente novamante.',
      })
      router.push('/signup')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className=" px-6 py-4">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Create your account to manager your money
        </p>
        <form
          onSubmit={handleSubmit(handleCreateAccount)}
          className="w-full space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" {...register('name')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" id="email" {...register('email')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" {...register('password')} />
          </div>

          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
        <div className="mt-2 flex items-center gap-2 text-zinc-200">
          <span className="text-sm">Já possui uma conta?</span>
          <Link href="/" className="text-sm capitalize hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
