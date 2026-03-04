import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride",
    text: "Maharsha Events made our dream wedding a reality. Every detail was perfect, from the floral arrangements to the entertainment. We couldn't have asked for a better team!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "CEO, TechCorp",
    text: "Our annual corporate gala was handled with utmost professionalism. The team's attention to detail and seamless execution exceeded all expectations.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    role: "Mother of the Birthday Girl",
    text: "The birthday party they organized for my daughter was absolutely magical. The theme, decorations, and activities — everything was beyond imagination!",
    rating: 5,
  },
];

const TestimonialCard = ({
  name,
  role,
  text,
  rating,
}: (typeof testimonials)[0]) => (
  <div className="bg-card rounded-xl p-8 hover-lift border border-border relative md:min-w-0 flex-shrink-0 w-[85%] min-w-[85%] sm:w-[75%] sm:min-w-[75%] md:w-auto md:min-w-0">
    <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-6" />
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, j) => (
        <Star key={j} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
    <p className="text-muted-foreground leading-relaxed mb-6">"{text}"</p>
    <div>
      <div className="font-semibold text-foreground">{name}</div>
      <div className="text-sm text-muted-foreground">{role}</div>
    </div>
  </div>
);

const AUTOPLAY_INTERVAL = 4000;

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Mobile: carousel with auto-scroll */}
        <div className="md:hidden relative px-2">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-x gap-4">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
