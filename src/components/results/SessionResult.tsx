    import { useGetResultsQuery } from "../../graphql/generated";
    import { useState, useEffect, useCallback, useRef } from "react";
    import useEmblaCarousel from "embla-carousel-react";

  interface SessionResultProps {
	calendarId: string | null;
	calendarData?: any;
}

    // Component for individual image carousels
    function ImageCarousel({
        images,
        title,
    }: {
        images: { url: string }[];
        title: string;
    }) {
        const [emblaRef, emblaApi] = useEmblaCarousel({
            loop: false, // Disable infinite loop
            containScroll: "keepSnaps",
            dragFree: true,
        });
        const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
        const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
        const [isMounted, setIsMounted] = useState(false);

        const scrollPrev = useCallback(
            () => emblaApi && emblaApi.scrollPrev(),
            [emblaApi]
        );
        const scrollNext = useCallback(
            () => emblaApi && emblaApi.scrollNext(),
            [emblaApi]
        );
        const scrollTo = useCallback(
            (index: number) => emblaApi && emblaApi.scrollTo(index),
            [emblaApi]
        );

        const onSelect = useCallback(() => {
            if (!emblaApi) return;
            setSelectedIndex(emblaApi.selectedScrollSnap());
            setPrevBtnEnabled(emblaApi.canScrollPrev());
            setNextBtnEnabled(emblaApi.canScrollNext());
        }, [emblaApi]);

        useEffect(() => {
            if (!emblaApi || !isMounted) return;
            onSelect();
            setScrollSnaps(emblaApi.scrollSnapList());
            emblaApi.on("select", onSelect);
            emblaApi.on("reInit", onSelect);

            return () => {
                emblaApi.off("select", onSelect);
                emblaApi.off("reInit", onSelect);
            };
        }, [emblaApi, onSelect, isMounted]);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        const urls = images.map((img) => img.url);
        const [lightboxOpen, setLightboxOpen] = useState(false);
        const [lightboxIndex, setLightboxIndex] = useState(0);

        const openLightbox = (index: number) => {
            setLightboxIndex(index);
            setLightboxOpen(true);
        };

        // Determine if we should use carousel based on screen size and number of images
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }, []);

        const shouldUseCarousel = isMobile || images.length > 3;

        // Don't render anything if there are no images
        if (!images || images.length === 0) {
            return null;
        }

        return (
            <div className="my-6">
                <h3 className="text-xl font-semibold mb-3">{title}</h3>

                {/* Desktop grid for 3 or fewer images when not on mobile */}
                {!shouldUseCarousel && (
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
                        {images.length <= 3 &&
                            images.map((img, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer w-full h-64 bg-f1-lightCarbon flex items-center justify-center rounded"
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={img.url}
                                        alt={`${title} ${index + 1}`}
                                        className="max-w-full max-h-full object-contain rounded"
                                    />
                                </div>
                            ))}
                    </div>
                )}

                {/* Carousel for mobile or when more than 3 images */}
                {shouldUseCarousel && images.length > 0 && (
                    <div className="relative">
                        {/* Outer wrapper that allows overflow */}
                        <div className="relative overflow-hidden md:overflow-visible">
                            <div className="embla overflow-visible" ref={emblaRef}>
                                <div className="embla__container flex cursor-pointer">
                                    {images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="embla__slide flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 gap-4 px-2"
                                        >
                                            <div
                                                className="cursor-pointer w-full h-64 bg-f1-lightCarbon flex items-center justify-center rounded"
                                                onClick={() => openLightbox(index)}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`${title} ${index + 1}`}
                                                    className="max-w-full max-h-full object-contain rounded"
                                                    onLoad={() => {
                                                        if (emblaApi) {
                                                            setTimeout(
                                                                () =>
                                                                    emblaApi.reInit(),
                                                                100
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dark overlays outside */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 -translate-x-full w-screen bg-white/88" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 translate-x-full w-screen bg-white/88" />
                        </div>

                        {/* Navigation arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="embla__prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full disabled:opacity-30 z-20 cursor-pointer"
                                    onClick={scrollPrev}
                                    disabled={!prevBtnEnabled}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="embla__next absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full disabled:opacity-30 z-20 cursor-pointer"
                                    onClick={scrollNext}
                                    disabled={!nextBtnEnabled}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Lightbox for this carousel */}
                {lightboxOpen && (
                    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50">
                        <div className="flex-grow flex items-center justify-center">
                            <img
                                src={urls[lightboxIndex]}
                                alt="Preview"
                                className="max-h-[70vh] max-w-[90vw] rounded-lg"
                            />
                        </div>
                        <div className="mt-4 flex gap-4 pb-4">
                            <button
                                onClick={() =>
                                    setLightboxIndex(
                                        (prev) =>
                                            (prev - 1 + urls.length) % urls.length
                                    )
                                }
                                className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer"
                            >
                                Anterior
                            </button>
                            <a
                                href={urls[lightboxIndex]}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="px-4 py-2 bg-f1-red text-white rounded cursor-pointer"
                            >
                                Salvar
                            </a>
                            <button
                                onClick={() =>
                                    setLightboxIndex(
                                        (prev) => (prev + 1) % urls.length
                                    )
                                }
                                className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer"
                            >
                                Próximo
                            </button>
                            <button
                                onClick={() => setLightboxOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    export function SessionResult({ calendarId }: SessionResultProps) {
        const { data, error, loading } = useGetResultsQuery({
            variables: { calendarId: calendarId || "" },
            skip: !calendarId,
        });

        if (!calendarId) {
            return (
                <div className="px-3 my-15 md:my-30 text-center">
                    <h3 className="text-xl font-semibold text-f1-text">
                        Selecione uma corrida no calendário acima para ver os
                        resultados
                    </h3>
                </div>
            );
        }

        if (loading) {
            return (
                <div className="my-5 text-center">
                    <div className="animate-pulse">
                        <div className="h-6 bg-f1-bg-silver rounded w-1/3 mx-auto mb-4"></div>
                        <div className="h-4 bg-f1-bg-silver rounded w-1/2 mx-auto"></div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="my-5 text-center">
                    <h3 className="text-xl font-semibold text-f1-red">
                        Erro ao carregar resultados: {error.message}
                    </h3>
                </div>
            );
        }

        const calendarResult = data?.results?.find(
            (result) => result.calendar?.id === calendarId
        );

        if (!calendarResult) {
            return (
                <div className="my-5 text-center">
                    <h2 className="text-2xl font-bold mb-2 text-f1-red">
                        Resultados da Corrida
                    </h2>
                    <p className="text-f1-text">
                        Nenhum resultado disponível para esta corrida.
                    </p>
                </div>
            );
        }

        console.log(calendarResult);
        return (
            <div className="px-3 mx-auto max-w-screen-xl my-6">
                <h2 className="text-2xl font-bold mb-4 text-f1-red">
                    Resultados da Corrida
                </h2>

                {/* Winners */}
                <div
                    className={`grid grid-cols-1 gap-3 ${
                        calendarResult.winnerSprint
                            ? "md:grid-cols-3"
                            : "md:grid-cols-2"
                    }`}
                >
                    {calendarResult.winnerSprint && (
                        <div className="bg-f1-bg-silver p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-2">
                                Vencedor Sprint
                            </h4>
                            <p className="text-xl text-f1-red font-bold">
                                {calendarResult.winnerSprint.name} (#
                                {calendarResult.winnerSprint.number})
                            </p>
                            <p className="text-gray-600">
                                Equipe: {calendarResult.winnerSprint.team.name}
                            </p>
                        </div>
                    )}
                    {calendarResult.winnerA && (
                        <div className="bg-f1-bg-silver p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-2">
                                Vencedor Corrida - Classe A
                            </h4>
                            <p className="text-xl text-f1-red font-bold">
                                {calendarResult.winnerA.name} (#
                                {calendarResult.winnerA.number})
                            </p>
                            <p className="text-gray-600">
                                Equipe: {calendarResult.winnerA.team.name}
                            </p>
                        </div>
                    )}
                    {calendarResult.winnerB && (
                        <div className="bg-f1-bg-silver p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-2">
                                Vencedor Corrida - Classe B
                            </h4>
                            <p className="text-xl text-f1-red font-bold">
                                {calendarResult.winnerB.name} (#
                                {calendarResult.winnerB.number})
                            </p>
                            <p className="text-gray-600">
                                Equipe: {calendarResult.winnerB.team.name}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sprint */}
                {calendarResult.winnerSprint &&
                    calendarResult.sprint &&
                    calendarResult.sprint.length > 0 && (
                        <ImageCarousel
                            images={calendarResult.sprint}
                            title="Sprint"
                        />
                    )}

                {/* Quali */}
                {calendarResult.quali && calendarResult.quali.length > 0 && (
                    <ImageCarousel
                        images={calendarResult.quali}
                        title="Qualificação"
                    />
                )}

                {/* Race */}
                {calendarResult.race && calendarResult.race.length > 0 && (
                    <ImageCarousel images={calendarResult.race} title="Corrida" />
                )}
            </div>
        );
    }
