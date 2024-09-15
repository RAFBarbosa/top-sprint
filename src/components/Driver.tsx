
interface DriverProps {
    name: string;
    team: string;
    driverNumber: string;
    photo: string;
}

export function Driver(props: DriverProps) {

    return (
        <div className="group">
            <span>
                <img src={props.photo.url} alt={`${props.name} photo`} className="w-200 h-200 object-cover" />
            </span>
            <header className="flex items-center justify-between mt-2">
                <div className='flex flex-col'>
                    <strong className='text-3xl'>
                        {props.name}
                    </strong>
                    <span className='text-lg'>
                        {props.team}
                    </span>
                </div>
                <strong className='text-5xl'>
                    {props.driverNumber}
                </strong>
            </header>
        </div>
    )
}