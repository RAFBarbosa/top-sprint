import { useState, useEffect, ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    open: boolean;
}

export function Menu({ open, ...rest }: IProps) {
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        setIsOpened(open);
    }, [open])

    return (
        <button {...rest}>
            {isOpened
                ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 32 32"
                >
                    <path
                        stroke="#81D8F7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 8l15.556 15.556M8 24L23.556 8.444"
                    ></path>
                </svg>
                : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 32 32"
                >
                    <path
                        stroke="#81D8F7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 16h22M5 8h22M5 24h22"
                    ></path>
                </svg>
            }
        </button>
    )
}