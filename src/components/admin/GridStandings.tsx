import { useParams } from "react-router-dom";
import { Standings } from "../standings/Standings";
import { useTab } from "../../contexts/TabContext";
import { useEffect } from "react";

export function GridStandings() {
	const { gridId } = useParams<{ gridId: string }>();
	const { setActiveTab } = useTab();

	useEffect(() => {
		if (gridId) {
			setActiveTab({ id: gridId as any });
		}
	}, [gridId, setActiveTab]);

	return <Standings />;
}