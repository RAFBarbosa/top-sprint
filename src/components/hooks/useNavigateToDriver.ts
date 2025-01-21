import { useNavigate } from "react-router-dom";

const useNavigateToDriver = () => {
	const navigate = useNavigate();

	const navigateToDriver = (driverName: string) => {
		console.log(driverName);
		navigate(`/pilotos/${driverName.toLowerCase()}`);
	};

	return navigateToDriver;
};

export default useNavigateToDriver;
