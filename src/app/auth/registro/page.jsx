"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit( async (data) => {

        if (data.password !== data.confirmPassword)
        {
            return alert("Contraseñas no coinciden");
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })

        if(res.ok)
        {
            router.push('/auth/ingreso')
        }
    });
    console.log(errors);
    
  return (
        
        <div className="min-h-screen flex flex-col justify-center sm:py-12">
            <div className="relative w-full sm:max-w-xl sm:mx-auto">

                <form className="relative px-4 py-20 rounded-3xl
                 -translate-y-16
                 bg-[#6d809aff] "
                onSubmit={onSubmit}>
                    
                    <div className="relative px-4 py-10">
                
                    <h1 className="textoReg text-[#d7e2e9ff] text-center"> Registrate </h1>
                

                    <div className="relative mb-10 left-11">
                        <input type="text"
                        {...register("username",{required: { value: true, message: "Usuario es requerido"}})}
                        id="username" className="peer placeholder-transparent w-10/12 bg-transparent border-b py-2 border-[#d7e2e9ff]
                        focus: outline-none focus:border-lime-100 focus:border-b-2 transition-colors text-teal-100 font-semibold" placeholder="Usuario:"
                        />
                            { errors.username && ( <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.username.message}</span> ) }
                        <label htmlFor="username" className="absolute left-0 -top-3.5 text-[#d7e2e9ff] text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-100 peer-focus:text-lg duration-400"> Usuario: </label>
                    </div>
                    <div className="relative mb-10 left-11">
                        
                        <input type="email"
                        {...register("email",{required: { value: true, message: "E-Mail es requerido"}})}
                        className="peer placeholder-transparent w-10/12 bg-transparent border-b py-2 border-[#d7e2e9ff]
                        focus: outline-none focus:border-lime-100 focus:border-b-2 transition-colors text-slate-100 font-semibold" placeholder="Email:"
                        />
                            { errors.email && ( <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.email.message}</span> ) }
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-[#d7e2e9ff] text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-100 peer-focus:text-lg duration-400"> E-Mail </label>
                    </div>
                    
                    <div className="relative mb-10 left-11">
                        <input type="password"
                        {...register("password",{required: { value: true, message: "Contraseña es requerida"}})}
                        className="peer placeholder-transparent w-10/12 bg-transparent border-b py-2 border-[#d7e2e9ff]
                        focus: outline-none focus:border-lime-100 focus:border-b-2 transition-colors text-slate-100 font-semibold" placeholder="Contraseña:"
                        />
                            { errors.password && ( <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.password.message}</span> ) }
                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-[#d7e2e9ff] text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-100 peer-focus:text-lg duration-400"> Contraseña </label>
                    </div>

                    <div className="relative mb-10 left-11">
                        <input type="password"
                        {...register("confirmPassword",{required: { value: true, message: "Confirmacion es requerida"}})}
                        id="confirmPassword" className="peer placeholder-transparent w-10/12 bg-transparent border-b py-2 border-[#d7e2e9ff]
                        focus: outline-none focus:border-lime-100 focus:border-b-2 transition-colors text-slate-100 font-semibold" placeholder="Confirma Contraseña:"
                        />
                            { errors.confirmPassword && ( <span className='absolute left-0 top-10 text-sm text-red-500'>{errors.confirmPassword.message}</span> ) }
                        <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-[#d7e2e9ff] text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-100 peer-focus:text-lg duration-400"> Confirma Contraseña </label>
                        </div>

                    <div className="relative">
                        <button className="mx-36 p-4 rounded-lg border-2 border-[#d7e2e9ff] font-mono
                        bg-gradient-to-tr text-[#d7e2e9ff] hover:bg-[#d7e2e9ff] hover:text-[#264946ff] transition duration-500 text-4xl font-extrabold"> Registrarme </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
  )
}