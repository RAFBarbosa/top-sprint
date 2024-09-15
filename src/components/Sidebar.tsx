import { useGetDriversQuery } from "../graphql/generated";
import { Driver } from "./Driver";

export function Sidebar() {
    const { data, error, loading } = useGetDriversQuery();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading drivers: {error.message}</p>;

    return (
        <aside className="w-full md:w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Pilotos
            </span>

            <div className="flex flex-col gap-8">
                {data?.drivers && data.drivers.length > 0 ? (
                    data.drivers.map(driver => (
                        <Driver
                            key={driver.id}
                            name={driver.name}
                            team={driver.team}
                            driverNumber={driver.driverNumber}
                            photo={driver.photo}
                        />
                    ))
                ) : (
                    <p>No drivers available</p>
                )}
            </div>
        </aside>
    );
}
