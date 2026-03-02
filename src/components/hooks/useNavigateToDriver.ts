// REPLACE ENTIRE FILE:
import { useNavigate } from "react-router-dom";

const useNavigateToDriver = () => {
	const navigate = useNavigate();

	const navigateToDriver = (driverName: string) => {
		const slug = driverName.toLowerCase().replace(/\s+/g, "-");
		navigate(`/pilotos/${slug}`);
	};

	return navigateToDriver;
};

export default useNavigateToDriver;
