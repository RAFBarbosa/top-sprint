import { CalendarRegistration } from "../../components/admin/CalendarRegistration";
import React from "react";
import { useParams } from "react-router-dom";

const CalendarAdmin: React.FC = () => {
	const { gridId } = useParams<{ gridId: string }>();

	return (
		<div className="">
			<CalendarRegistration gridId={gridId} />
		</div>
	);
};

export default CalendarAdmin;
