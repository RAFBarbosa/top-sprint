import Car1Bg from "/src/assets/car1-bg.png";
import Car2Bg from "/src/assets/car2-bg.png";
import Car3Bg from "/src/assets/car3-bg.png";
import Car4Bg from "/src/assets/car4-bg.png";

export function Rules() {
	return (
		<aside
			id="regras"
			className="max-w-screen-xl mx-auto px-3 leading-snug"
		>
			<div className="h-16 bg-divider bg-cover my-4 opacity-5"></div>
			<div className="w-full mb-10">
				<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 relative mb-8">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide">
						Regras e Formato
					</h1>
				</div>
				<div className="p-3 w-full h-auto bg-f1-silver bg-cover bg-opacity-5 border-0 rounded-xl tracking-normal">
					As regras utilizadas serão baseadas no{" "}
					<a
						href="https://downloads.f1esports.com/Rules/2022/F1_Esports_Series_Participants_Handbook_v1.5.pdf"
						target="_blank"
						className="text-f1-red font-bold underline"
					>
						manual oficial
					</a>
					.
				</div>
			</div>
			<div className="space-y-8">
				<div className="flex flex-col md:flex-row items-start mb-6">
					<div className="w-full md:w-1/2 space-y-4">
						<div className="font-bold text-xl">
							<p>O campeonato utilizará F1 24.</p>
							<p>
								As corridas acontecerão todas as quartas-feiras
								às 22h.
							</p>
						</div>
						<p>
							Os dias de corrida serão divididos em duas etapas:
						</p>
						<div className="space-y-2">
							<strong className="block text-xl">
								Primeira Etapa (Sprint):
							</strong>
							<ul className="list-disc ml-5 space-y-1">
								<li>Grid: Posição no campeonato invertido*</li>
								<li>Duração: 5 Voltas</li>
								<li>
									A sprint é uma corrida para dar chance a
									quem está mais atrás no campeonato, onde os
									jogadores podem arriscar mais nas
									ultrapassagens.
								</li>
							</ul>
							<span className="italic text-f1-silver">
								*Na primeira corrida da temporada, haverá uma
								qualificatória de uma volta para definir o grid
								da Sprint.
							</span>
						</div>
						<div className="space-y-2">
							<strong className="block text-xl">
								Segunda Etapa (Corrida):
							</strong>
							<ul className="list-disc ml-5 space-y-1">
								<li>Grid: Qualificatória de 1 volta.</li>
								<li>Duração: 35% do circuito. </li>
								<li>
									A qualificatória de uma volta dá a chance de
									até os melhores errarem e ficarem para trás.
									Na corrida, a ideia é ser conservador nas
									ultrapassagens. Se você for melhor do que o
									piloto à sua frente, eventualmente o
									ultrapassará durante a corrida de 35%.
								</li>
							</ul>
							<p className="md:hidden italic border-b-2 border-r-2 mt-3 border-f1-red rounded-br-xl p-3">
								"Ninguém vence a corrida na primeira curva, mas
								pode perdê-la."
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

				<div>
					<div className="w-full h-auto relative mb-6">
						<div className="border-t-8 border-r-8 border-b-8 border-f1-purple rounded-tr-3xl rounded-br-3xl pt-8 w-full">
							<div className="font-bold md:text-4xl text-3xl pr-4 absolute left-0 bg-white -top-[30px] mt-3">
								Configuração da Corrida
							</div>
							<div className="w-full flex flex-col md:flex-row-reverse">
								<div className="space-y-2 mb-3 md:w-1/2">
									<p>
										<strong>Desempenho:</strong> os pilotos
										correrão com os carros definidos antes
										do campeonato e com o desempenho igual.
									</p>
									<p>
										<strong>Assistências:</strong> Todas
										assistências liberadas exceto
										assistência de direção, assistência de
										entrada e saída dos boxes e assistências
										de DRS e ERS.
									</p>
									<p>
										<strong>Lobby:</strong> As configurações
										para o lobby estão descritas abaixo:
									</p>
									<ul className="list-disc ml-5 space-y-1">
										<li>Dificuldade da IA: 50%</li>
										<li>Dano: Completo</li>
										<li>Clima: Dinâmico</li>
										<li>Safety Car: Ligado e Reduzido</li>
										<li>Regras e Bandeiras: Ligado</li>
										<li>Corte de curvas: Rígido</li>
										<li>
											Volta de apresentação: Desligado
										</li>
										<li>Largada: Manual</li>
										<li>Regra de Parque Fechado: Ligado</li>
									</ul>
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

					<div className="w-full h-auto relative mb-6">
						<div className="border-t-8 border-r-8 border-b-8 border-f1-red rounded-tr-3xl rounded-br-3xl pt-8 w-full">
							<div className="font-bold md:text-4xl text-3xl pr-4 absolute left-0 bg-white -top-[30px] mt-3">
								Pilotos Reservas
							</div>
							<div className="w-full flex flex-col md:flex-row">
								<div className="space-y-2 mb-3 md:w-1/2">
									<p>
										Se houverem pilotos reservas durante o
										campeonato, eles não irão contar pontos
										para o piloto que estão substituindo,
										assim como para a equipe de
										construtores. A pontuação para os demais
										pilotos irá ignorar a existência do
										piloto reserva.
									</p>
									<p>
										Ex: o piloto reserva ficou em primeiro e
										um titular em segundo - o piloto titular
										terá a pontuação de primeiro. O mesmo
										serve para Pole e Volta Rápida.
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
				</div>
				<div className="flex flex-col md:flex-row items-start gap-8">
					<div className="w-full md:w-1/2 space-y-4">
						<strong className="text-3xl">Penalidades</strong>
						<p className="mt-2">
							É esperado que todos os pilotos da{" "}
							<strong>Top Sprint</strong> corram de forma justa,
							deixando espaço para dividir curvas e atendo-se às
							regras. Porém, haverá incidentes, e mesmo que não
							haja a intenção, estes incidentes podem prejudicar a
							corrida do rival. Por isso, as penalidades serão
							dadas independentemente da intenção.
						</p>
						<div>
							<strong className="mt-4">
								As corridas precisam ser gravadas caso os
								pilotos queiram abrir tickets ou se defender.
							</strong>
							<p className="mt-4">
								<strong>
									Tickets poderão ser abertos para remoção de
									penalidades por bug do jogo.{" "}
								</strong>
								Haverá três juízes independentes, que não
								estiveram envolvidos no incidente, para realizar
								a análise. Os juízes justificarão as penalidades
								com base em regras fatuais, e revisões podem ser
								requisitadas.
							</p>
						</div>
						<div>
							<p className="mt-4">
								As penalidades para corridas serão:
							</p>
						</div>
						<div>
							<ul className="list-disc list-inside ml-4">
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
									<strong>-8 pontos</strong>: Quando o piloto
									der NC (não completar) no carro do outro
									piloto ou múltiplos carros com danos.
								</li>
							</ul>
						</div>
					</div>

					<div className="hidden md:block w-full md:w-1/2">
						<img
							className="w-full  shadow-lg"
							src={Car3Bg}
							alt="Car 3"
						/>
						<div>
							<p className="mt-4">
								As penalidades para a <strong>Sprint</strong>{" "}
								são reduzidas: 1, 2, ou 4 pontos.
							</p>
							<p className="mt-4">
								Penalidades adicionais (até 5 pontos) podem ser
								aplicadas se houver intenção de causar o
								incidente.
							</p>
							<p className="mt-4">
								Se um piloto reserva causar NC em um carro
								titular, o titular poderá abrir uma análise de
								incidente para reaver a pontuação mínima (último
								lugar) daquela corrida, conforme a ordem dos
								incidentes.
							</p>
							<p className="mt-4">
								Os juízes podem aplicar penalidades com base na
								gravação oficial, mesmo que os pilotos
								envolvidos não tenham aberto um ticket, se a
								culpa for inquestionável.
							</p>
							<span className="italic block mt-4">
								As regras utilizadas serão baseadas no{" "}
								<a
									href="https://downloads.f1esports.com/Rules/2022/F1_Esports_Series_Participants_Handbook_v1.5.pdf"
									target="_blank"
									className="text-blue-400 underline"
								>
									manual oficial
								</a>
								.
							</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<p>
					corrida 1 - 25 pontos 2 - 22 pontos 3 - 20 pontos 4 - 18
					pontos 5 - 16 pontos 6 - 15 pontos 7 - 14 pontos 8 - 13
					pontos 9 - 12 pontos 10 - 11 pontos 11 - 10 pontos 12 - 9
					pontos 13 - 8 pontos 14 - 7 pontos 15 - 6 pontos 16 - 5
					pontos 17 - 4 pontos 18 - 3 pontos 19 - 2 pontos 20 - 1
					ponto sprint 1 - 16 pontos 2 - 14 pontos 3 - 12 pontos 4 -
					11 pontos 5 - 10 pontos 6 - 9 pontos 7 - 8 pontos 8 - 7
					pontos 9 - 6 pontos 10 - 5 pontos 11 - 4 pontos 12 - 3
					pontos 13 - 2 pontos 14 - 1 pontos 15 - Sem pontos 16 - Sem
					pontos 17 - Sem pontos 18 - Sem pontos 19 - Sem pontos 20 -
					Sem pontos bônus Melhor volta: 2 pontos Pole: 2 pontos
					Presença por Corrida: 1 ponto
				</p>
			</div>
		</aside>
	);
}
