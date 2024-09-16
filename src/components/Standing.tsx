interface StandingProps {
    season: string;
    round: string;
    photos: string[];
}

export function Standing(props: StandingProps) {

    return (
        <div className="group mx-2">
            <strong className='text-xl'>
                {props.season}
            </strong>
            {/* Add flex container to align images side by side */}
            <div className="flex space-x-2">
                {props.photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`${props.season} ${props.round} photo ${index + 1}`}
                        className="w-1/2 object-cover"
                    />
                ))}
            </div>
            <span className='text-xl'>
                {props.round}
            </span>
        </div>
    );
}
