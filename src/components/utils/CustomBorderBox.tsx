import React from "react";

interface CustomBorderBoxProps {
	className?: string;
	children: React.ReactNode;
	/**
	 * Define os lados onde a borda aparecerá.
	 * Valores aceitos:
	 * - 'top', 'bottom', 'left', 'right'
	 * - 'top-right', 'top-left', 'bottom-right', 'bottom-left'
	 * - 'all' (todas as bordas)
	 */
	borderSides?:
		| "top"
		| "bottom"
		| "left"
		| "right"
		| "top-right"
		| "top-left"
		| "bottom-right"
		| "bottom-left"
		| "all";
	/**
	 * Classe do Tailwind para margin, por exemplo: "m-4", "mt-2", etc.
	 */
	margin?: string;
	/**
	 * Classe do Tailwind para a cor da borda, por exemplo: "border-gray-500"
	 */
	borderColor?: string;
	/**
	 * Classe do Tailwind para o border-radius.
	 * Se não for definida, um valor padrão será aplicado conforme o borderSides.
	 */
	borderRadius?: string;
	/**
	 * Classe para padding (opcional)
	 */
	padding?: string;
}

// Mapeia os valores de borderSides para um valor padrão de border-radius
const defaultRadiusMap: Record<
	NonNullable<CustomBorderBoxProps["borderSides"]>,
	string
> = {
	top: "",
	bottom: "",
	left: "",
	right: "",
	"top-right": "rounded-tr-lg",
	"top-left": "rounded-tl-lg",
	"bottom-right": "rounded-br-lg",
	"bottom-left": "rounded-bl-lg",
	all: "rounded-lg",
};

const CustomBorderBox: React.FC<CustomBorderBoxProps> = ({
	className,
	children,
	borderSides = "bottom-right",
	margin = "m-0",
	borderColor = "border-gray-500",
	borderRadius,
	padding = "p-0",
}) => {
	let borderClass = "";
	if (borderSides === "all") {
		borderClass = "border";
	} else {
		const sides = borderSides.split("-");
		borderClass = sides
			.map((side) => {
				switch (side) {
					case "top":
						return "border-t";
					case "bottom":
						return "border-b";
					case "left":
						return "border-l";
					case "right":
						return "border-r";
					default:
						return "";
				}
			})
			.join(" ");
	}

	// Se borderRadius não for passado, usamos o valor padrão do mapa (pode ser vazio)
	const radiusClass = borderRadius
		? borderRadius
		: defaultRadiusMap[borderSides];

	// Concatena as classes finais
	const classes = `${className} ${margin} ${padding} ${borderClass} ${borderColor} ${radiusClass}`;

	return <div className={classes}>{children}</div>;
};

export default CustomBorderBox;
