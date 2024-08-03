"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

const AuthModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitSignIn = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
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
    } catch (e) {
      setIsLoading(false);
      setError(e.message || 'Error al iniciar sesión');
    }
  });

  const onSubmitRegister = handleSubmit(async (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      setIsLoading(false);
      return setError("Las contraseñas no coinciden");
    }

    try {
      const res = await fetch('/api/auth/register', {
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
        // Cerrar el modal de registro y abrir el de inicio de sesión
        setError(null);
        setIsRegistering(false);
        setShowModal(true);
      } else {
        let errorData;
        try {
          const text = await res.text();
          errorData = JSON.parse(text);
          setError(errorData.message || 'Error en el registro');
        } catch (e) {
          setError('Error en el registro');
        }
      }
    } catch (e) {
      setIsLoading(false);
      setError(e.message || 'Error en el registro');
    }
  });

  const toggleModal = (isRegister) => {
    setError(null);
    setIsRegistering(isRegister);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={() => toggleModal(false)} className="p-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
        Iniciar Sesión
      </button>
      <button onClick={() => toggleModal(true)} className="p-3 rounded bg-teal-600 text-white hover:bg-teal-700 transition duration-300 ml-2">
        Registrarse
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-lg mx-auto mt-8">
            <button onClick={closeModal} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full">X</button>

            <form className="space-y-6" onSubmit={isRegistering ? onSubmitRegister : onSubmitSignIn}>
              {error && (
                <p className="bg-red-400 text-white rounded-xl p-3 mb-4 text-center">
                  {error}
                </p>
              )}

              <h2 className="text-2xl text-center" style={{ color: '#221A18' }}>
                {isRegistering ? 'Regístrate' : 'Ingresa con tu usuario'}
              </h2>

              {isRegistering && (
                <>
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
                </>
              )}

              <div className="relative mb-4">
                <input
                  autoComplete="off"
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "Correo es requerido" },
                    
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

              {isRegistering && (
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
              )}

              <div className="text-center">
                <button className="p-3 rounded bg-green-500 text-white hover:bg-green-600 transition duration-300" disabled={isLoading}>
                  {isLoading ? 'Cargando...' : isRegistering ? 'Registrarme' : 'Entrar'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                  <button
                    type="button"
                    onClick={() => toggleModal(!isRegistering)}
                    className="text-blue-500 hover:underline ml-1"
                  >
                    {isRegistering ? 'Inicia sesión' : 'Regístrate'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthModal;
