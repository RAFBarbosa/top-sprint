import Car1Bg from "/src/assets/car1-bg.png";
import Car2Bg from "/src/assets/car2-bg.png";
import Car3Bg from "/src/assets/car3-bg.png";
import Car4Bg from "/src/assets/car4-bg.png";

export function Rules() {
	return (
		<aside className="w-full bg-gray-700 p-8 border-l border-gray-600 ">
			<span className="font-bold text-4xl pb-6 mb-8 border-b border-gray-600 block">
				Regras
			</span>
			<div className="space-y-8 ">
				<div className="flex flex-col md:flex-row items-start gap-8">
					<div className="w-full md:w-1/2 space-y-4">
						<strong className="text-3xl mb-4">Formato</strong>
						<p className="font-bold">
							O campeonato utilizará F1 24.<br></br> As corridas
							acontecerão todas as quarta-feiras às 22h.
						</p>
						<p>
							Os dias de corridas serão divididos em duas etapas:
						</p>
						<div className="space-y-2">
							<strong className="block text-xl">
								Primeira Etapa (Sprint):
							</strong>
							<ul className="list-disc ml-5 space-y-1">
								<li>Grid: Posição no campeonato invertido*</li>
								<li>Duração: 5 Voltas</li>
								<li>
									Contexto: A sprint é uma corrida para dar
									chance a quem está mais atrás no campeonato,
									e é a corrida onde os jogadores podem
									arriscar mais nas ultrapassagens.
								</li>
							</ul>
							<span className="italic text-gray-300">
								*Na primeira corrida da temporada será
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
									ultrapassagens, se você é melhor do que o
									piloto à sua frente você eventualmente irá
									passá-lo durante a corrida de 35%.
								</li>
							</ul>
							<p className="italic">
								"Ninguém vence a corrida na primeira curva mas
								pode perder."
							</p>
						</div>
					</div>
					<img
						className="hidden md:block w-full md:w-1/2 mt-6 md:mt-0 md:ml-8  shadow-lg"
						src={Car1Bg}
						alt="Car 1"
					/>
				</div>

				<div className="flex flex-col md:flex-row-reverse items-start bg-gray-600 p-6 shadow-lg">
					<div className="w-full md:w-1/2 space-y-4 ">
						<strong className="text-3xl">Pilotos Reservas</strong>
						<p>
							Se houverem pilotos reservas durante o campeonato,
							eles não irão contar pontos para o piloto que estão
							substituindo, assim como para a equipe de
							construtores. A pontuação para os demais pilotos irá
							ignorar a existência do piloto reserva.
						</p>
						<p>
							Ex: o piloto reserva ficou em primeiro e um titular
							em segundo - o piloto titular terá a pontuação de
							primeiro. O mesmo serve para Pole e Volta Rápida.
						</p>
					</div>
					<img
						className="w-full md:w-1/2 mt-6 md:mt-0 md:mr-8  shadow-lg"
						src={Car2Bg}
						alt="Car 2"
					/>
				</div>

				<div className="flex flex-col md:flex-row items-start gap-8">
					<div className="w-full md:w-1/2 space-y-4">
						<strong className="text-3xl">Penalidades</strong>
						<p className="mt-2">
							É esperado que todos os pilotos da{" "}
							<strong>Top Sprint</strong> corram de forma justa,
							deixando espaço para dividir curvas e se atendo às
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
								Haverão três juízes independentes, que não
								estiveram envolvidos no incidente, para realizar
								a análise. Os juízes irão provar o motivo das
								penalidades com base em regras factuais, e
								revisões podem ser requisitadas.
							</p>
						</div>
						<div>
							<p className="mt-4">
								As penalidades para corridas serão:
								<ul className="list-disc list-inside ml-4">
									<li>
										<strong>-2 pontos</strong>: Quando o
										piloto atrasar outro piloto (rodar,
										tirar da pista) sem danos ou com dano
										mínimo (verde claro).
									</li>
									<li>
										<strong>-4 pontos</strong>: Quando o
										piloto causar danos (amarelo ou maior)
										que forcem o piloto a ir ao pit.
									</li>
									<li>
										<strong>-8 pontos</strong>: Quando o
										piloto der NC (não completar) no carro
										do outro piloto ou múltiplos carros com
										danos.
									</li>
								</ul>
							</p>
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

				<div className="flex flex-col md:flex-row-reverse items-start bg-gray-600 p-6  shadow-lg">
					<div className="w-full md:w-1/2 space-y-4">
						<strong className="text-3xl">
							Configuração da Corrida
						</strong>
						<p>
							<strong>Desempenho:</strong> os pilotos correrão com
							os carros definidos antes do campeonato e com o
							desempenho igual.
						</p>
						<p>
							<strong>Assistências:</strong> Todas assistências
							liberadas exceto assistência de direção, assistência
							de entrada e saída dos boxes e assistências de DRS e
							ERS.
						</p>
						<p>
							<strong>Lobby:</strong> As configurações para o
							lobby estão descritas abaixo:
						</p>
						<ul className="list-disc ml-5 space-y-1">
							<li>Dificuldade da IA: 50%</li>
							<li>Dano: Completo</li>
							<li>Clima: Dinâmico</li>
							<li>Safety Car: Ligado e Reduzido</li>
							<li>Regras e Bandeiras: Ligado</li>
							<li>Corte de curvas: Rígido</li>
							<li>Volta de apresentação: Desligado</li>
							<li>Largada: Manual</li>
							<li>Regra de Parque Fechado: Ligado</li>
						</ul>
					</div>
					<img
						className="w-full md:w-1/2 mt-6 md:mt-0 md:mr-8  shadow-lg"
						src={Car4Bg}
						alt="Car 4"
					/>
				</div>
			</div>
		</aside>
	);
}
