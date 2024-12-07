import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
	children: React.ReactNode;
	slidesToShowDesktop?: number; // Number of slides on desktop
	slidesToShowMobile?: number; // Number of slides on mobile
}

const Carousel: React.FC<CarouselProps> = ({
	children,
	slidesToShowDesktop = 3,
	slidesToShowMobile = 1,
}) => {
	const totalSlides = React.Children.count(children);

	// Adjust settings based on requirements
	const settings = {
		infinite: totalSlides > 3, // Default infinite scrolling for desktop
		slidesToShow: Math.min(totalSlides, slidesToShowDesktop), // Show defined slides on desktop or total count
		slidesToScroll: Math.min(totalSlides, slidesToShowDesktop),
		autoplay: totalSlides > 1, // Autoplay only if > 1 slide
		arrows: totalSlides > slidesToShowDesktop, // Show arrows only if more slides than visible
		speed: 1000,
		autoplaySpeed: 10000,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768, // Mobile and tablet
				settings: {
					infinite: totalSlides > 1, // Infinite scrolling only if > 1 slide
					autoplay: totalSlides > 1,
					slidesToShow: Math.min(totalSlides, slidesToShowMobile),
					slidesToScroll: Math.min(totalSlides, slidesToShowMobile),
				},
			},
		],
	};

	return (
		<div className="relative">
			<Slider {...settings}>
				{React.Children.map(children, (child) => (
					<div className="px-2">{child}</div> // Add horizontal gap
				))}
			</Slider>
		</div>
	);
};

export default Carousel;
