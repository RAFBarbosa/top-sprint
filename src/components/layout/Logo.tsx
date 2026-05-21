import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { tenant } from "../../shared/config/tenants";

export function Logo() {
	const { logoUrl } = useTenantConfig();
	return (
		<img
			src={logoUrl}
			alt={tenant.logo.alt}
			className="max-h-full w-auto"
		/>
	);
}
