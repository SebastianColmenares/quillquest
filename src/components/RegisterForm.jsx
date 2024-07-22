"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      setIsLoading(false);
      return setError("Las contraseñas no coinciden");
    }

    const res = await fetch('/api/auth/registro', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setIsLoading(false);

    if (res.ok) {
      router.push('/auth/ingreso');
    } else {
      const errorData = await res.json();
      setError(errorData.message || 'Error en el registro');
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-lg mx-auto mt-8">
        <form className="space-y-6" onSubmit={onSubmit}>
          {error && (
            <p className="bg-red-400 text-white rounded-xl p-3 mb-4 text-center">
              {error}
            </p>
          )}

          <h2 className="text-2xl text-center" style={{ color: '#221A18' }}>Regístrate</h2>

          <div className="relative mb-4">
            <input
              type="text"
              {...register("username", { required: { value: true, message: "Usuario es requerido" } })}
              id="username"
              className="peer placeholder-transparent w-full bg-transparent border-b py-2 border-gray-400 focus:outline-none focus:border-green-500 focus:border-b-2 transition-colors"
              placeholder="Usuario:"
              style={{ color: '#221A18' }}
            />
            {errors.username && (
              <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.username.message}</span>
            )}
            <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm" style={{ color: '#221A18' }}>Usuario:</label>
          </div>

          <div className="relative mb-4">
            <input
              type="email"
              {...register("email", { 
                required: { value: true, message: "Correo es requerido" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo no es válido"
                }
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
              {...register("password", { 
                required: { value: true, message: "Contraseña es requerida" },
                minLenght: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres"
                },
                validate: {
                  uppercase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                  lowercase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                  symbol: value => /[^A-Za-z0-9]/.test(value) || "Password must contain at least one special character"
              }
              })}
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

          <div className="relative mb-4">
            <input
              type="password"
              {...register("confirmPassword", { required: { value: true, message: "Confirmación es requerida" } })}
              id="confirmPassword"
              className="peer placeholder-transparent w-full bg-transparent border-b py-2 border-gray-400 focus:outline-none focus:border-green-500 focus:border-b-2 transition-colors"
              placeholder="Confirma Contraseña:"
              style={{ color: '#221A18' }}
            />
            {errors.confirmPassword && (
              <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.confirmPassword.message}</span>
            )}
            <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm" style={{ color: '#221A18' }}>Confirma Contraseña:</label>
          </div>

          <div className="text-center">
            <button className="p-3 rounded bg-green-500 text-white hover:bg-green-600 transition duration-300" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Registrarme'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?
              <button
                type="button"
                onClick={() => router.push('/auth/ingreso')}
                className="text-blue-500 hover:underline ml-1"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
