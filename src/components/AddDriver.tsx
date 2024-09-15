import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDriverMutation } from "../graphql/generated";
import GenericDriver from '/src/assets/logosemfundo.png';
import { ReactLogo } from "./ReactLogo";
import { Sidebar } from "./Sidebar";

export function AddDriver() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [driverNumber, setDriverNumber] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);

    const [createDriver, { loading }] = useCreateDriverMutation();

    // Default image path or identifier
    const defaultPhoto = { create: { file: { url: '/src/assets/logosemfundo.png' } } };

    console.log(defaultPhoto)

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();

        // Handle file upload and obtain the URL or identifier
        const photoInput = photo
            ? { create: { file: photo } }
            : defaultPhoto;

        await createDriver({
            variables: {
                name,
                team,
                driverNumber,
                photo: photoInput
            }
        });

        navigate('/event');
    }

    function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    }

    return (
        <div>
            <div className="z-10 w-full max-w-[1216px] flex flex-col md:flex-row items-center justify-between mt-10 md:mt-20 mx-auto">
                <div className="w-full md:max-w-[391px] px-6 py-8 mt-8 md:px-8 md:mt-0 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-lg md:text-2xl mb-6 block">
                        Cadastro de Piloto
                    </strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="required required:border-red-500 text-base bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Nome do Piloto"
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Equipe"
                            onChange={event => setTeam(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="text"
                            placeholder="Numero"
                            onChange={event => setDriverNumber(event.target.value)}
                        />
                        <input
                            className="required required:border-red-500 bg-gray-900 rounded px-5 h-14 outline-green-300 focus:outline focus:outline-green-300 valid:text-white-700"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Cadastrar Piloto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
