import Car1Bg from "/src/assets/car1-bg.png";
import Car2Bg from "/src/assets/car2-bg.png";
import Car3Bg from "/src/assets/car3-bg.png";
import Car4Bg from "/src/assets/car4-bg.png";

export function Rules() {
	return (
		<aside id="regras" className="mx-auto leading-snug">
			<div className="w-full mb-8 max-w-screen-xl px-3 mx-auto">
				<div className="h-16 bg-divider bg-cover my-4 opacity-5"></div>
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
			<div className="flex flex-col md:flex-row items-start mb-10 max-w-screen-xl px-3 mx-auto">
				<div className="w-full md:w-1/2 space-y-4 px-3">
					<div className="font-bold text-xl">
						<p>O campeonato utilizará F1 24.</p>
						<p>
							As corridas acontecerão todas as quartas-feiras às
							22h.
						</p>
					</div>
					<p>Os dias de corrida serão divididos em duas etapas:</p>
					<div className="space-y-2">
						<strong className="block text-xl">
							Primeira Etapa (Sprint):
						</strong>
						<ul className="list-disc ml-5 space-y-1">
							<li>Grid: Posição no campeonato invertido*</li>
							<li>Duração: 5 Voltas</li>
							<li>
								A sprint é uma corrida para dar chance a quem
								está mais atrás no campeonato, onde os jogadores
								podem arriscar mais nas ultrapassagens.
							</li>
						</ul>
						<p className="italic text-f1-silver">
							*Na primeira corrida da temporada, haverá uma
							qualificatória de uma volta para definir o grid da
							Sprint.
						</p>
					</div>
					<div className="space-y-2">
						<strong className="block text-xl">
							Segunda Etapa (Corrida):
						</strong>
						<ul className="list-disc ml-5 space-y-1">
							<li>Grid: Qualificatória de 1 volta.</li>
							<li>Duração: 35% do circuito. </li>
							<li>
								A qualificatória de uma volta dá a chance de até
								os melhores errarem e ficarem para trás. Na
								corrida, a ideia é ser conservador nas
								ultrapassagens. Se você for melhor do que o
								piloto à sua frente, eventualmente o
								ultrapassará durante a corrida de 35%.
							</li>
						</ul>
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
				<div className="border-t-8 border-r-8 border-b-8 border-f1-purple rounded-tr-3xl rounded-br-3xl pt-8 w-full">
					<div className="font-bold md:text-4xl text-3xl pr-4 absolute bg-white -top-[30px] mt-3">
						Configuração da Corrida
					</div>
					<div className="w-full flex flex-col md:flex-row-reverse">
						<div className="space-y-2 mb-3 md:w-1/2 pr-4">
							<p>
								<strong>Desempenho:</strong> os pilotos correrão
								com os carros definidos antes do campeonato e
								com o desempenho igual.
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
								Se houverem pilotos reservas durante o
								campeonato, eles não irão contar pontos para o
								piloto que estão substituindo, assim como para a
								equipe de construtores. A pontuação para os
								demais pilotos irá ignorar a existência do
								piloto reserva.
							</p>
							<p>
								Ex: o piloto reserva ficou em primeiro e um
								titular em segundo - o piloto titular terá a
								pontuação de primeiro. O mesmo serve para Pole e
								Volta Rápida.
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

			<div className="mb-8 pt-8 pb-2 bg-f1-bg-silver">
				<div className="w-full h-auto relative max-w-screen-xl px-3 mx-auto">
					<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 mb-6">
						<h2 className="font-bold text-3xl md:text-4xl">
							Pontuação
						</h2>
					</div>
					<div className="flex flex-col justify-center max-w-screen-md mx-auto mb-4">
						<div className="">
							<table className="min-w-full text-left">
								<thead>
									<tr className="border-b border-b-white">
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
										"11",
										"12",
										"13",
										"14",
										"15",
										"16",
										"17",
										"18",
										"19",
										"20",
									].map((position, index) => (
										<tr
											key={index}
											className=" even:bg-white odd:bg-f1-bg-silver"
										>
											<td className="px-4 py-4">
												{position}
											</td>
											<td className="px-4 py-4">
												{
													[
														"25 pontos",
														"22 pontos",
														"20 pontos",
														"18 pontos",
														"16 pontos",
														"15 pontos",
														"14 pontos",
														"13 pontos",
														"12 pontos",
														"11 pontos",
														"10 pontos",
														"9 pontos",
														"8 pontos",
														"7 pontos",
														"6 pontos",
														"5 pontos",
														"4 pontos",
														"3 pontos",
														"2 pontos",
														"1 ponto",
													][index]
												}
											</td>
											<td className="px-4 py-4">
												{
													[
														"16 pontos",
														"14 pontos",
														"12 pontos",
														"11 pontos",
														"10 pontos",
														"9 pontos",
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
														"0 pontos",
														"0 pontos",
														"0 pontos",
														"0 pontos",
													][index]
												}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="px-4 mt-4">
							<p className="mb-2 font-bold text-xl">
								Pontos extra
							</p>
							<div className="md:flex md:gap-x-6 space-y-1 md:space-y-0">
								<p>
									<strong>Melhor volta:</strong> 2 pontos
								</p>
								<p>
									<strong>Pole position:</strong> 2 pontos
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
									<strong>-8 pontos</strong>: Quando o piloto
									der NC (não completar) no carro do outro
									piloto ou múltiplos carros com danos.
								</li>
							</ul>
						</div>
					</div>

					<div className="w-full md:w-1/2 space-y-2">
						<p>
							<strong>
								As penalidades para a Sprint são reduzidas: 1,
								2, ou 4 pontos.
							</strong>
						</p>
						<div className="space-y-2 flex flex-col">
							<strong>
								Penalidades adicionais (até 5 pontos) podem ser
								aplicadas se houver intenção/imprudência de
								causar o incidente.
							</strong>
							<p>
								Se um piloto reserva causar NC em um carro
								titular, o titular poderá abrir uma análise de
								incidente para reaver a pontuação mínima (último
								lugar) daquela corrida, conforme a ordem dos
								incidentes.
							</p>
							<p>
								Os juízes podem aplicar penalidades com base na
								gravação oficial, mesmo que os pilotos
								envolvidos não tenham aberto um ticket, se a
								culpa for inquestionável.
							</p>

							<p className="italic border-b-2 border-r-2 mt-3 border-f1-red rounded-br-xl p-3">
								As regras utilizadas serão baseadas no{" "}
								<a
									href="https://downloads.f1esports.com/Rules/2022/F1_Esports_Series_Participants_Handbook_v1.5.pdf"
									target="_blank"
									className="text-f1-red underline"
								>
									manual oficial
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
