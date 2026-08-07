import { useTenantConfig } from "../../contexts/TenantConfigContext";

export function Logo() {
	const { logoUrl, name } = useTenantConfig();
	return (
		<img
			src={logoUrl}
			alt={name}
			className="max-h-full w-auto"
		/>
	);
}
