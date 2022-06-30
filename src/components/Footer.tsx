import LogoRocket from '/src/assets/logo-rocket.png';

export function Footer() {
    return (
        <div className="flex w-auto mx-6 py-4 border-t text-gray-300 border-gray-500 items-center justify-between flex-col md:flex-row">
            <div className="flex gap-4 flex-col items-center md:gap-6 md:flex-row md:flex-start">
                <img src={LogoRocket} alt="" />
                <span className="text-sm md:text-md">
                    Rocketseat - Todos os direitos reservados
                </span>
            </div>
            <a
                className="text-sm mt-6 hover:text-white-700 transition-colors md:mt-0"
                href=""
            >
                Políticas de privacidade
            </a>
        </div>
    )
}