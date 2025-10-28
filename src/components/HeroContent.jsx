import React from "react";

const HeroContent = ({ image, title, subtitle }) => {
    return (
        // Mengganti h-[calc(100vh-0px)] menjadi h-screen untuk kejelasan kode
        <section className="relative w-full h-[60vh] md:h-screen pt-20 flex items-center justify-center text-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt="Hero Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-dark/80"></div>
            </div>

            {/* Content */}
            {/* Menambahkan px-4 untuk layar terkecil */}
            <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-4xl text-light">
                {/* Menambahkan step sm:text-4xl untuk transisi font yang lebih halus */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-lg font-bold">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-4 text-base md:text-lg font-light leading-relaxed opacity-90">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
};

export default HeroContent;
