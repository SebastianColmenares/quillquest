"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      router.push('/');
      router.refresh();
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-lg mx-auto mt-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <p className="bg-red-400 text-white rounded-xl p-3 mb-4 text-center">
              {error}
            </p>
          )}

          <h2 className="text-2xl text-center" style={{ color: '#221A18' }}>Ingresa con tu usuario</h2>

          <div className="relative mb-4">
            <input
              autoComplete="off"
              type="text"
              {...register("email", { 
                required: { value: true, message: "Correo es requerido" },
                pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
              })}
              id="email"
              className="peer placeholder-transparent w-full bg-transparent border-b py-2 border-gray-400 focus:outline-none focus:border-green-500 focus:border-b-2 transition-colors"
              placeholder="Email:"
              style={{ color: '#221A18' }}
            />
            {errors.email && (
              <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.email.message}</span>
            )}
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm" style={{ color: '#221A18' }}>Correo electrónico:</label>
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              {...register("password", { required: { value: true, message: "Contraseña es requerida" } })}
              id="password"
              className="peer placeholder-transparent w-full bg-transparent border-b py-2 border-gray-400 focus:outline-none focus:border-green-500 focus:border-b-2 transition-colors"
              placeholder="Contraseña:"
              style={{ color: '#221A18' }}
            />
            {errors.password && (
              <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.password.message}</span>
            )}
            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm" style={{ color: '#221A18' }}>Contraseña:</label>
          </div>

          <div className="text-center">
            <button className="p-3 rounded bg-green-500 text-white hover:bg-green-600 transition duration-300" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta? 
              <button
                type="button"
                onClick={() => router.push('/auth/register')}
                className="text-blue-500 hover:underline ml-1"
              >
                Regístrate
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
