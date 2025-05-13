import React, { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
    const [isInView, setIsInView] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect(); // Stop observing once the image is in view
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the image is visible
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                observer.unobserve(wrapperRef.current);
            }
        };
    }, []);

    return (
        <div ref={wrapperRef} className={className}>
            {isInView && (
                <LazyLoadImage
                    src={src}
                    alt={alt}
                    effect="blur"
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default LazyImage;