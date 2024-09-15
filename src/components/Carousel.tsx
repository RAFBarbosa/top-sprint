import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
    children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        nextArrow: <div className="slick-arrow slick-next hidden md:flex">→</div>,
        prevArrow: <div className="slick-arrow slick-prev hidden md:flex">←</div>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {React.Children.map(children, (child) => (
                <div className="carousel-slide">{child}</div>
            ))}
        </Slider>
    );
};

export default Carousel;
