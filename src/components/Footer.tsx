import LogoRocket from '/src/assets/logo-rocket.png';

export function Footer() {
    return (
        <div className="flex w-auto mx-6 md:mx-8 py-4 border-t text-gray-300 border-gray-500 items-center justify-between flex-col md:flex-row text-center">
            <div className="flex gap-4 flex-col items-center md:gap-6 md:flex-row md:flex-start">
                {/* <img src={LogoRocket} alt="Logo Rocketseat" /> */}
                <span className="text-sm md:text-base">
                    Top Sprint League - Todos os direitos reservados
                </span>
            </div>
            <a
                className="text-sm md:text-base mt-6 hover:text-gray-100 transition-colors md:mt-0"
                href=""
            >
                Políticas de privacidade
            </a>
        </div>
    )
}