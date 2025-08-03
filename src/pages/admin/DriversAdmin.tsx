import { DriverRegistration } from "../../components/admin/DriverRegistration";
import React from "react";

const DriversAdmin: React.FC = () => {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
			<DriverRegistration />
		</div>
	);
};

export default DriversAdmin;
