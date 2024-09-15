import { useGetHallsOfFameQuery } from "../graphql/generated";
import Carousel from './Carousel';
import GenericLogo from '/src/assets/logosemfundo.png'
import { HallOfFame } from "./HallOfFame";

export function HallsOfFame() {
    const { data, error, loading } = useGetHallsOfFameQuery();

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>;

    return (
        <aside className="w-full bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-4xl pb-6 mb-6 border-b border-gray-500 block">
                Mural dos Campeões
            </span>

            <Carousel>
                {data?.hallsOfFame && data.hallsOfFame.length > 0 ? (
                    data.hallsOfFame.map(data => (
                        <HallOfFame
                            key={data.id}
                            season={data.season || ''}
                            photo={data.photo || { url: GenericLogo }}
                        />
                    ))
                ) : (
                    <p>No drivers available</p>
                )}
            </Carousel>
        </aside>
    );
}
