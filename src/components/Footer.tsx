import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
	return (
		<div className="">
			<div className="">
				<div className="w-[60px]">
					<Link to="/">
						<Logo />
					</Link>
				</div>
				<span className="">
					Top Sprint League - Todos os direitos reservados
				</span>
			</div>
			<a className="" href="">
				Políticas de privacidade
			</a>
		</div>
	);
}
