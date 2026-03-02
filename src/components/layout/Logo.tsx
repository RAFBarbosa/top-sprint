import { tenant } from "../../shared/config/tenants";

export function Logo() {
	return (
		<img
			src={tenant.logo.url}
			alt={tenant.logo.alt}
			className="h-full w-auto"
		/>
	);
}

