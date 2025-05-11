'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import type SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { useEffect, memo, useState } from 'react';
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface Slide {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  image: string;
  gradient: string;
}

interface YoutubeLink {
  name: string;
  url: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface SlideContentProps {
  slide: Slide;
  index: number;
}

interface NavigationDotsProps {
  slides: Slide[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const slides: Slide[] = [
  {
    title: "Suivez nos différentes chaines YouTube !",
    description: "Nous avons 4 chaînes grâce auxquelles nous diffusons nos différents contenus.",
    buttonText: "Voir les chaines",
    link: "/services",
    image: "/images/YTb.webp",
    gradient: "from-purple-900/80 via-indigo-900/60 to-transparent",
  },
  {
    title: "Achetez nos produits originaux !",
    description: "Nous vendons des articles pour soutenir notre mission humanitaire.",
    buttonText: "Visiter la boutique",
    link: "/projects",
    image: "/images/Boutique.jpeg",
    gradient: "from-amber-900/50 via-red-900/60 to-transparent",
  },
  {
    title: "Notre production cinématographique",
    description: "Dans le but de vous divertir, nous produisons des films libre d'accès !",
    buttonText: "Suivre les films",
    link: "/film",
    image: "/images/Cinema.webp",
    gradient: "from-emerald-900/80 via-teal-900/60 to-transparent",
  },
  {
    title: "Organisation Non Gouvernementale",
    description: "Devenez partenaire, donateur ou bénévole de notre organisation.",
    buttonText: "Je veux postuler",
    link: "/form",
    image: "/images/ONG.webp",
    gradient: "from-teal-900/80 via-emerald-900/60 to-transparent",
  },
];

const YouTubeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const youtubeLinks: YoutubeLink[] = [
    { name: 'Les vrais adorateurs', url: 'https://www.youtube.com/@SVATV%C3%89VANG%C3%89LIQUE' },
    { name: '3 Savoirs', url: 'https://www.youtube.com/@3savoirstv' },
    { name: 'SEED TV Cinéma', url: 'https://www.youtube.com/@SEEDTVCINEMAFran%C3%A7ais' },
    { name: 'ONG SEED TV', url: 'https://www.youtube.com/@ONGSEEDTVEDUCATIVE' },
  ];

  return (
    <div className="relative">
      <motion.button
        className={`flex items-center justify-center w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaYoutube size={20} />
        <motion.span 
          className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          animate={{ scale: isOpen ? 0 : 1 }}
        >
          {youtubeLinks.length}
        </motion.span>
      </motion.button>

      {isOpen && (
        <motion.div
          className="absolute bottom-full left-0 mb-2 w-55 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {youtubeLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              title={link.name} 
            >
              <div className="flex items-center">
                <FaYoutube className="mr-2 text-red-600 flex-shrink-0" />
                <span className="overflow-hidden text-ellipsis">{link.name}</span>
              </div>
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const SocialMediaBox = () => {
  const socialLinks: SocialLink[] = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/Sauvonslenfanceendifficulte', 
      icon: <FaFacebook size={18} />, 
      bgColor: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/ongseedtv', 
      icon: <FaInstagram size={18} />, 
      bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/jeannot-kashala-49653b356', 
      icon: <FaLinkedin size={18} />, 
      bgColor: 'bg-blue-500 hover:bg-blue-600'
    },
  ];

return (
    <div className="fixed bottom-4 right-2 lg:right-auto lg:left-4 z-20 flex flex-col items-center gap-3 whitespace-nowrap">
      <YouTubeDropdown />

      <div className="flex flex-col gap-2">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-8 h-8 rounded-full ${link.bgColor} text-white shadow-lg transition-all duration-300`}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

const SlideContent = memo<SlideContentProps>(({ slide, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.04), transparent 80%)`;

  useEffect(() => {
    const animateRadius = animate(radius, 300, {
      duration: 30,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    });
    return () => animateRadius.stop();
  }, [radius]);

  return (
    <div 
      className="relative w-full h-full"
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
    >
      <motion.div 
        className="absolute inset-0"
        data-swiper-parallax="-30%"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "linear" }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority={index === 0}
          quality={100}
        />
      </motion.div>
      
      <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradient}`} />
      
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ background }}
      />
      
      <div className="container h-full flex items-center relative z-10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white px-4"
        >
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            data-swiper-parallax="-200"
          >
            {slide.title}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white"
            data-swiper-parallax="-100"
          >
            {slide.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href={slide.link}
              className="inline-block relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/10 group-hover:bg-white transition-all duration-500 rounded-full" />
              <span className="relative z-10 flex items-center justify-center bg-transparent border-2 border-white text-gray-200 px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-300">
                {slide.buttonText}
                <motion.span 
                  className="ml-2 text-black"
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

SlideContent.displayName = 'SlideContent';

const NavigationDots = ({ slides, activeIndex, onDotClick }: NavigationDotsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
      {slides.map((_, index) => (
        <motion.div 
          key={index}
          className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/30'} hover:bg-white cursor-pointer transition-all relative overflow-hidden`}
          whileHover={{ scale: 1.5 }}
          onClick={() => onDotClick(index)}
        >
          {index === activeIndex && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                transition: { 
                  duration: 7,
                  ease: "linear" 
                } 
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function Slider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden group">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1500}
        parallax={true}
        loop
        className="w-full h-full"
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideContent slide={slide} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <NavigationDots 
        slides={slides} 
        activeIndex={activeIndex} 
        onDotClick={handleDotClick} 
      />
      
      <SocialMediaBox />
      
      <motion.div 
        className="absolute inset-0 border-8 border-white/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}
