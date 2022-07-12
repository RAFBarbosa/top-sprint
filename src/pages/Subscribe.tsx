import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import { useCreateSubscriberMutation } from "../graphql/generated";
import CodeMockup from '/src/assets/code-mockup.png';
import { ReactLogo } from "../components/ReactLogo";

export function Subscribe() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();

        await createSubscriber({
            variables: {
                name,
                email
            }
        })

        navigate('/event');
    }

    return (
        // CONTAINER
        <div className="min-h-screen bg-blur bg-no-repeat bg-cover flex flex-col items-center">
            {/* REACT LOGO BG */}
            <div className="absolute mt-[10px] scale-50 md:scale-100">
                <ReactLogo />
            </div>

            {/* CONTENT */}
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-10 md:mt-20 mx-auto">

                {/* HEADER */}
                <div className="max-w-[624px] items-center md:items-start flex flex-col">
                    <Logo />

                    <h1 className="mt-6 md:mt-8 text-[30px] md:text-[40px] mx-6 md:mx-0 text-center md:text-left leading-tight">
                        Construa uma
                        <strong className="text-blue-500"> aplicação completa</strong>
                        , do zero, com
                        <strong className="text-blue-500"> React JS</strong>
                    </h1>
                    <p className="mt-6 mx-6 text-sm md:text-base text-center md:ml-0 md:text-left text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                {/* SUBSCRIBE */}
                <div className="w-full md:max-w-[391px] px-6 py-8 mt-8 md:px-8 md:mt-0 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-lg md:text-2xl mb-6 block">
                        Inscreva-se gratuitamente
                    </strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="required required:border-red-500 text-base bg-gray-900 rounded px-5 h-14 hover:outline hover:outline-1 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 hover:outline hover:outline-1 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Digite seu e-mail"
                            onChange={event => setEmail(event.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Garantir minha vaga
                        </button>
                        {/* <button type="button" className="bg-indigo-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50" disabled>
                        <div className="motion-reduce:hidden animate-spin"></div>
                            Processing...
                        </button> */}
                    </form>
                </div>
            </div>

            {/* IMAGE CODE */}
            <img src={CodeMockup} className="z-10" alt="" />

            {/* FOOTER */}
            <div className="w-full bg-gray-900">
                <Footer />
            </div>
        </div>
    )
}