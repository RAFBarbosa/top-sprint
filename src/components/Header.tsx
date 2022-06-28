import { Logo } from "./Logo";
import { Menu } from "./Menu";

interface IProps {
    width?: number;
    height?: number;
    open?: boolean;
    toggleMenu: () => void;
}

export function Header({ width = undefined, height = undefined, open = false, toggleMenu }: IProps) {
    return (
        <header className="p-4 md:py-5 flex w-full items-center justify-between lg:justify-center bg-gray-700 border-b border-gray-600">
            <Logo height={height} width={width} />
            <div className="flex lg:hidden items-center text-sm gap-2">
                Aulas
                <Menu open={open} onClick={toggleMenu} />
            </div>
        </header>
    )
}