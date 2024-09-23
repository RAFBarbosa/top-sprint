import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
	children: React.ReactNode;
	slidesToShow?: number;
	slidesToScroll?: number;
	autoplay?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
	slidesToShow = 3,
	slidesToScroll = 3,
	autoplay = true,
	children,
}) => {
	const settings = {
		infinite: true,
		speed: 500,
		adaptiveHeight: true,
		autoplay,
		slidesToShow,
		slidesToScroll,
		nextArrow: (
			<div className="slick-arrow slick-next hidden md:block">→</div>
		),
		prevArrow: (
			<div className="slick-arrow slick-prev hidden md:block">←</div>
		),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
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
				<div>{child}</div>
			))}
		</Slider>
	);
};

export default Carousel;
