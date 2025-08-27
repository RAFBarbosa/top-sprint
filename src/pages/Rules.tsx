import { Divider } from "../components/layout/Divider";
import Car1Bg from "/src/assets/img/car1-bg.png";
import Car2Bg from "/src/assets/img/car2-bg.png";
import Car4Bg from "/src/assets/img/car4-bg.png";

export function Rules() {
	const racePoints = [
		"20 pontos",
		"16 pontos",
		"14 pontos",
		"12 pontos",
		"10 pontos",
		"8 pontos",
		"6 pontos",
		"4 pontos",
		"2 pontos",
		"1 ponto",
	];

	const sprintPoints = [
		"8 pontos",
		"7 pontos",
		"6 pontos",
		"5 pontos",
		"4 pontos",
		"3 pontos",
		"2 pontos",
		"1 ponto",
		"0 pontos",
		"0 pontos",
	];

	return (
		<aside id="regras" className="mx-auto leading-snug w-full">
			<div className="w-full mb-8 max-w-screen-xl px-3 mx-auto">
				<Divider className="max-w-screen-xl mx-auto px-3" />
				<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 relative mb-8">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide">
						Regras e Formato
					</h1>
				</div>
				<div className="p-3 w-full h-auto bg-f1-bg-silver bg-cover bg-opacity-5 rounded-xl tracking-normal">
					As regras utilizadas serão baseadas no{" "}
					<a
						href="https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmbylqzb10o8107mzfm9zewqg"
						target="_blank"
						className="text-f1-red font-bold underline"
					>
						manual oficial Top Sprint
					</a>
					.
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-start mb-10 max-w-screen-xl px-3 mx-auto">
				<div className="w-full md:w-1/2 space-y-4 px-3">
					<div className="font-bold text-xl">
						<p>O campeonato utilizará F1 25.</p>
						<p>
							As corridas acontecerão todas as quartas-feiras às
							22h.
						</p>
					</div>
					<p>
						A <strong>Top Sprint</strong> inclui{" "}
						<strong>corridas Sprint</strong>{" "}
						{/* e de{" "}
						<strong>desempenho realista</strong>, ambas  */}
						com o objetivo de criar oportunidades para quem está
						atrás no campeonato, oferecendo mais emoção nas disputas
						por posições e pontos.
					</p>
					<p>Os dias de corrida serão divididos em duas etapas:</p>
					<div className="space-y-2">
						<strong className="block text-xl">
							Primeira Etapa (Sprint):
						</strong>
						<ul className="ml-5 list-disc space-y-1">
							{/* <li>Grid: Qualificatória de 1 volta</li> */}
							<li>
								Grid Semi-Invertido: *
								<ul>
									<li>
										<b>-</b> 10 primeiras posições: Grid A
										invertido
									</li>
									<li>
										<b>-</b> 10 últimas posições: Grid B
										Invertido
									</li>
								</ul>
							</li>
							<li>Duração: 5 Voltas</li>
						</ul>
					</div>
					<div className="space-y-2">
						<strong className="block text-xl">
							Segunda Etapa (Corrida):
						</strong>
						<ul className="list-disc ml-5 space-y-1">
							<li>Grid: Qualificatória Curta (18 minutos)</li>
							<li>Duração: 35% do circuito</li>
						</ul>
						<p className="italic text-f1-silver">
							* Na primeira corrida da temporada, haverá uma
							qualificatória de uma volta para definir o grid da
							Sprint.
						</p>
						<p className="md:hidden italic border-b-2 border-r-2 mt-3 border-f1-red rounded-br-xl p-3">
							"Ninguém vence a corrida na primeira curva, mas pode
							perdê-la."
						</p>
					</div>
				</div>
				<figure className="hidden md:block w-full md:w-1/2">
					<img
						className="shadow-lg border-b-8 border-f1-red "
						src={Car1Bg}
						alt="Car 1"
					/>
					<figcaption className="italic text-right text-f1-silver border-b-2 border-r-2 mt-3 border-f1-lightSilver rounded-br-xl p-3 ">
						"Ninguém vence a corrida na primeira curva, mas pode
						perdê-la."
					</figcaption>
				</figure>
			</div>

			<div className="w-full h-auto relative mb-8 max-w-screen-xl px-3 mx-auto">
				<div className="border-t-8 border-r-8 border-b-8 border-f1-lighterPurple rounded-tr-3xl rounded-br-3xl pt-8 w-full">
					<div className="font-bold md:text-4xl text-3xl pr-4 absolute bg-white -top-[30px] mt-3">
						Configuração da Corrida
					</div>
					<div className="w-full flex flex-col md:flex-row-reverse">
						<div className="space-y-2 mb-3 md:w-1/2 pr-4">
							<p>
								<strong>Desempenho:</strong> Os pilotos
								utilizarão os carros definidos antes do
								campeonato e com desempenho igual.
								{/* em 7 das 9 corridas.  
								Duas corridas serão selecionadas para terem
								desempenho realista. 
								A distribuição dos carros será realizada
								conforme a tabela do campeonato da etapa
								anterior, atribuindo-se o pior carro ao piloto
								que estiver em primeiro lugar e o melhor carro
								ao piloto que estiver em último, e assim
								sucessivamente.*/}
							</p>
							<p>
								<strong>Assistências:</strong> Todas
								assistências liberadas exceto assistência de
								direção, assistência de entrada e saída dos
								boxes e assistências de DRS e ERS.
							</p>
							<p>
								<strong>Lobby:</strong> As configurações para o
								lobby estão descritas abaixo:
							</p>
							<div className="md:flex md:space-x-10">
								<ul className="list-disc ml-5">
									<li>Dificuldade da IA: 50%</li>
									<li>Dano: Completo</li>
									<li>Clima: Dinâmico</li>
									<li>Safety Car: Ligado e Reduzido</li>
									<li>Regras e Bandeiras: Ligado</li>
								</ul>
								<ul className="list-disc ml-5">
									<li>Corte de curvas: Rígido</li>
									<li>Volta de apresentação: Desligado</li>
									<li>Largada: Manual</li>
									<li>Regra de Parque Fechado: Ligado</li>
								</ul>
							</div>
						</div>
						<figure className="md:block w-full md:w-1/2 pr-3">
							<img
								className="w-full h-auto shadow-lg rounded-lg mb-3"
								src={Car4Bg}
								alt="Car 4"
							/>
						</figure>
					</div>
				</div>
			</div>

			<div className="w-full h-auto relative mb-8 max-w-screen-xl px-3 mx-auto">
				<div className="border-t-8 border-r-8 border-b-8 border-f1-red rounded-tr-3xl rounded-br-3xl pt-8 w-full">
					<div className="font-bold md:text-4xl text-3xl pr-4 absolute bg-white -top-[30px] mt-3">
						Pilotos Reservas
					</div>
					<div className="w-full flex flex-col md:flex-row">
						<div className="space-y-2 mb-3 md:w-1/2 pr-4">
							<p>
								Nas raras ocasiões onde pouca gente for
								participar da etapa. A direção pode convidar
								ex-pilotos <strong>Top Sprint</strong> para
								completar o grid.
							</p>
							{/* <p>
								Para evitar colisões com Reservas, na contagem
								da pontuação, a posição do reserva será
								ignorada.{" "}
								<i>
									Se o reserva ficou em terceiro, todos os
									titulares seguintes subirão uma posição.
								</i>
							</p> */}
							<p>
								<b>Terceiro Piloto:</b> A pedido dos jogadores,
								vamos introduzir uma forma de um piloto que
								souber que vai faltar, convidar um terceiro
								piloto para participar no seu lugar.
							</p>
							<ul className="list-disc ml-5">
								<li>
									Cada piloto pode fazer isso{" "}
									<strong>DUAS</strong> vezes na temporada
								</li>
								<li>
									O piloto titular receberá a pontuação
									equivalente à do terceiro piloto, mas
									contando como se tivesse terminado 5
									posições atrás
								</li>
								<li>
									Infrações cometidas pelo terceiro piloto,
									serão aplicadas ao piloto titular
								</li>
								<li>
									De forma geral,{" "}
									<strong>Pilotos Reserva Top Sprint</strong>{" "}
									deverão ter prioridade como terceiro piloto
								</li>
								<li>
									Como exceção a direção pode considerar
									pilotos externos caso exista vídeos de
									corridas do piloto proposto
								</li>
							</ul>
							<p>
								<i>
									Pilotos reservas e Terceiro Pilotos não
									poderão participar da última etapa.
								</i>
							</p>
						</div>
						<figure className="md:block w-full md:w-1/2 pr-3">
							<img
								className="w-full h-auto shadow-lg rounded-lg mb-3"
								src={Car2Bg}
								alt="Car 2"
							/>
						</figure>
					</div>
				</div>
			</div>

			<div className="mb-8 pt-8 pb-2 w-full bg-f1-bg-silver">
				<div className="w-full h-auto relative max-w-screen-xl px-3 mx-auto">
					<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 mb-6">
						<h2 className="font-bold text-3xl md:text-4xl">
							Pontuação
						</h2>
					</div>
					<div className="flex flex-col justify-center max-w-screen-sm mx-auto mb-4">
						<div className="border border-f1-carbon/50 rounded-2xl pt-3">
							<table className="min-w-full text-left">
								<thead>
									<tr className="border-b border-b-f1-carbon/50">
										<th className="px-4 pb-4 uppercase">
											Posição
										</th>
										<th className="px-4 pb-4 uppercase">
											Corrida Principal
										</th>
										<th className="px-4 pb-4 uppercase">
											Sprint
										</th>
									</tr>
								</thead>
								<tbody>
									{[
										"1",
										"2",
										"3",
										"4",
										"5",
										"6",
										"7",
										"8",
										"9",
										"10",
									].map((position, index, arr) => (
										<tr
											key={index}
											className="even:bg-white odd:bg-f1-bg-silver"
										>
											<td
												className={`px-4 py-4 ${
													index === arr.length - 1
														? "rounded-bl-2xl"
														: ""
												}`}
											>
												{position}
											</td>
											<td className="px-4 py-4">
												{racePoints[index]}
											</td>
											<td
												className={`px-4 py-4 ${
													index ===
													sprintPoints.length - 1
														? "rounded-br-2xl"
														: ""
												}`}
											>
												{sprintPoints[index]}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="px-4 mt-4">
							<p className="mb-2 font-bold text-xl">
								Pontos extra para ambos os grids:
							</p>
							<div className="space-y-1">
								<p>
									<strong>
										Melhor volta na corrida principal:
									</strong>{" "}
									1 ponto
								</p>
								<p>
									<strong>
										Pole position na corrida principal:
									</strong>{" "}
									1 ponto
								</p>
								<p>
									<strong>Presença por corrida:</strong> 1
									ponto
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-8 max-w-screen-xl px-3 mx-auto">
				<div className="border-t-8 border-r-8 border-f1-silver rounded-tr-3xl pt-3 mb-6">
					<h1 className="font-bold text-3xl md:text-4xl">
						Penalidades
					</h1>
				</div>
				<div className="flex flex-col md:flex-row md:gap-6 gap-2 pr-3">
					<div className="w-full md:w-1/2 space-y-2">
						<p>
							É esperado que todos os pilotos da{" "}
							<strong>Top Sprint</strong> corram de forma justa,
							deixando espaço para dividir curvas e atendo-se às
							regras. Porém, haverá incidentes, e mesmo que não
							haja a intenção, estes incidentes podem prejudicar a
							corrida do rival. Por isso, as penalidades serão
							dadas independentemente da intenção.
						</p>
						<div className="space-y-2">
							<p>
								<strong>
									As corridas precisam ser gravadas caso os
									pilotos queiram abrir tickets ou se
									defender.
								</strong>
							</p>
							<p>
								<strong>
									Tickets poderão ser abertos para remoção de
									penalidades por bug do jogo.
								</strong>
							</p>
							<p>
								Haverá três juízes independentes, que não
								estiveram envolvidos no incidente, para realizar
								a análise. Os juízes justificarão as penalidades
								com base em regras fatuais, e revisões podem ser
								requisitadas.
							</p>
						</div>
						<div>
							<p>As penalidades para corridas serão:</p>
						</div>
						<div>
							<ul className="list-disc ml-5">
								<li>
									<strong>-2 pontos</strong>: Quando o piloto
									atrasar outro piloto (rodar, tirar da pista)
									sem danos ou com dano mínimo (verde claro).
								</li>
								<li>
									<strong>-4 pontos</strong>: Quando o piloto
									causar danos (amarelo ou maior) que forcem o
									piloto a ir ao pit.
								</li>
								<li>
									<strong>-6 pontos</strong>: Quando o piloto
									der NC (não completar) no carro do outro
									piloto ou múltiplos carros com danos.
								</li>
							</ul>
						</div>
						<p>
							<strong>
								As penalidades para a Sprint são reduzidas: 1,
								2, ou 3 pontos.
							</strong>
						</p>
					</div>

					<div className="w-full md:w-1/2 space-y-2">
						<div className="space-y-2 flex flex-col">
							<p>
								<strong>
									Penalidades adicionais (até 4 pontos) podem
									ser aplicadas se houver intenção/imprudência
									de causar o incidente.
								</strong>
							</p>
							{/* <p>
								<strong>
									Incidentes envolvendo múltiplos carros:
								</strong>
							</p>
							<p>
								Se qualquer um dos pilotos atrás do carro que
								está liderando não possuir direito a linha
								(seguindo as regras do manual oficial),
								geralmente ele deverá ceder a posição ou será
								predominantemente culpado pelo incidente.
							</p>
							<p>
								Considerando a regra acima, os pilotos que estão
								executando a ultrapassagem precisam se
								certificar de que é segura e que não vai forçar
								de forma desnecessária que mais de dois carros
								dividam a curva.
							</p> */}
							<p>
								<strong>
									Os juízes podem aplicar penalidades com base
									na gravação oficial, mesmo que os pilotos
									envolvidos não tenham aberto um ticket, se a
									culpa for inquestionável.
								</strong>
							</p>
							<p>
								De forma geral, as penalidades serão dadas
								através de redução de pontos no campeonato.{" "}
								<strong>
									Em casos excepcionais, penalidades como
									acréscimo de tempo ou troca de posições
									poderão ser utilizadas, principalmente para
									incidentes que acontecem na volta final,
									onde a perda de pontos pode não refletir o
									impacto real da ocorrência
								</strong>
								.
							</p>
							<p className="italic border-b-2 border-r-2 mt-3 border-f1-red rounded-br-xl p-3">
								As regras utilizadas serão baseadas no{" "}
								<a
									href="https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmbylqzb10o8107mzfm9zewqg"
									target="_blank"
									className="text-f1-red font-bold underline"
								>
									manual oficial Top Sprint
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
