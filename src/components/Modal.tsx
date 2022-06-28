import React from "react"

interface IProps {
    children?: React.ReactNode;
}

export function Modal({ children }: IProps) {
    return (
        <div className="absolute top-12 bg-gray-700 w-full h-full z-50 flex justify-end transition-transform">
            {children}
        </div>
    )
}