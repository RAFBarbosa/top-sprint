import { TrashIcon } from "@heroicons/react/24/outline";

interface AdminDeleteButtonProps {
	deleted?: boolean;
	onClick: () => void;
}

export function AdminDeleteButton({ deleted, onClick }: AdminDeleteButtonProps) {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120 shrink-0"
			title={deleted ? "Restaurar" : "Excluir"}
		>
			<TrashIcon className="h-5 w-5" />
		</button>
	);
}
