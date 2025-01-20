import React from "react";

interface PlayerCardProps {
	data: {
		name: string;
		number: string;
		racecraft: string;
		awareness: string;
		pace: string;
		experience: string;
		rating: string;
		photo: string;
		teamColor: string;
		teamName: string;
	};
}

const PlayerCard: React.FC<PlayerCardProps> = ({ data }) => {
	const nameParts = data.name.split(" ");
	const firstName = nameParts[0];
	const secondName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

	return (
		<div className="player-card">
			<h2>{data.name}</h2>
			<p>Numero: {data.num}</p>
			<p>Pilotagem: {data.racecraft}</p>
			<p>Atencao: {data.awareness}</p>
			<p>Ritmo: {data.pace}</p>
			<p>Experiencia: {data.experience}</p>
			<p>Nota Geral: {data.rating}</p>
			<img src={data.photo} alt={`${data.name}'s photo`} />
			<p>{data.teamName}</p>
			<div
				style={{
					backgroundColor: data.teamColor,
					width: "100px",
					height: "100px",
				}}
			></div>
		</div>
	);
};

export default PlayerCard;
