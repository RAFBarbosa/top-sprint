import { useParams } from "react-router-dom";
import { ManualResultsRegistration } from "./ManualResultsRegistration";

export function GridManualResults() {
	const { gridId } = useParams<{ gridId: string }>();

	return <ManualResultsRegistration gridId={gridId} />;
}