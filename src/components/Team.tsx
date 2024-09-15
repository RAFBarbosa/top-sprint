
interface TeamProps {
    name: string;
    team: string;
    photo: { url: string; };
}

export function Team(props: TeamProps) {

    return (
        <div className="group mx-2">
            <strong className='text-3xl'>
                {props.team}
            </strong>
            <img src={props.photo?.url} alt={`${props.name} photo`} className="w-full my-2" />
            <span className='text-xl'>
                {props.name}
            </span>
        </div>
    )
}