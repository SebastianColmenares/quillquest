"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { useState } from 'react';

function LoginPage() {

  const { register, handleSubmit ,formState: {errors} } = useForm();
  const router = useRouter();
  const [ error, setError ] = useState(null);

  const onSubmit = handleSubmit(async data => {
    console.log(data);

     const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if(res.error)
    {
      setError(res.error);
    } else {
      router.push('/');
      router.refresh();
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative w-full sm:max-w-xl sm:mx-auto">
      <form onSubmit={onSubmit} className="relative px-4 py-10 rounded-3xl
            -translate-y-48 bg-[#6d809aff] ">

          {error && (<p className=" bg-red-400 text-white rounded-xl p-3 mb-4 text-center" > {error} </p>)}

          <h1 className="textoReg text-[#d7e2e9ff] text-center py-"> Ingresa con tu usuario </h1>

            
              <div className="relative mb-10 left-11">
                <input autocomplete="off" type="text"
                {...register("email",{required: { value: true, message: "E-Mail es requerido"}})}
                id="email" className="peer placeholder-transparent w-10/12 bg-transparent border-b py-2 border-[#d7e2e9ff]
                focus: outline-none focus:border-lime-100 focus:border-b-2 transition-colors text-lime-100 font-bold" placeholder="Email:"
                />
                   { errors.email && ( <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.email.message}</span> ) }
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-[#d7e2e9ff] text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-100 peer-focus:text-sm duration-400"> E-Mail: </label>
              </div>
            
              <div className="relative left-11">
                <input type="password"
                {...register("password",{required: { value: true, message: "Contraseña es requerido"}})}
                id="password" className="peer placeholder-transparent w-10/12 bg-transparent border-b py-2 border-[#d7e2e9ff]
                focus: outline-none focus:border-lime-100 focus:border-b-2 transition-colors text-lime-100 font-bold" placeholder="Contraseña:"
                />
                { errors.password && ( <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.password.message}</span> ) }
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-[#d7e2e9ff] text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-100 peer-focus:text-sm duration-400"> Contraseña: </label>
              </div>

              <div className="relative">
                    <button className="my-8 mx-48 p-4 rounded-lg border-2 border-[#d7e2e9ff] font-mono
                        bg-gradient-to-tr text-[#d7e2e9ff] hover:bg-[#d7e2e9ff] hover:text-[#264946ff] transition duration-500 text-4xl font-extrabold"
                    > Entrar
                    </button>
            </div>

      </form>
      </div>
    </div>
  )
}

export default LoginPage