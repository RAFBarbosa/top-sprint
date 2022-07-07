import { Logo } from "./Logo";
import { Menu } from "./Menu";

interface ModalProps {
    open?: boolean;
    toggleMenu: () => void;
}

export function Header({ open = false, toggleMenu }: ModalProps) {
    return (
        <header>
            <div className="p-4 md:py-5 px-6 flex w-full justify-between lg:justify-center bg-gray-700 border-b border-gray-600">
                <Logo />

                <div className="flex lg:hidden items-center text-sm gap-2">
                    Aulas
                    <Menu open={open} onClick={toggleMenu} />
                </div>
            </div>
        </header>
    )
}