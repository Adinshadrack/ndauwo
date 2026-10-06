import {
  Binoculars,
  Camera,
  Mountain,
  TentTree,
} from "lucide-react";

const experiences = [
  {
    icon: Binoculars,
    title: "Wildlife Safaris",
    text: "Get close to Tanzania's incredible wildlife in some of Africa's most iconic parks.",
  },
  {
    icon: Mountain,
    title: "Mountain Adventures",
    text: "Take on unforgettable mountain landscapes with experienced local guides.",
  },
  {
    icon: Camera,
    title: "Photographic Journeys",
    text: "Slow down, explore and capture the landscapes and wildlife you'll remember forever.",
  },
  {
    icon: TentTree,
    title: "Authentic Experiences",
    text: "Go beyond the usual itinerary and experience the people, culture and nature of Tanzania.",
  },
];

export function Experiences() {
  return (
    <section className="bg-[#FCFAF4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">
              The Ndauwo Experience
            </p>

            <h2 className="font-display mt-5 text-[2.75rem] leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]">
              Choose your
              <br />
              adventure
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-black/50 md:pb-1">
            Every journey is shaped around the way you want to experience
            Tanzania.
          </p>
        </div>

        {/* Experiences */}
        <div className="mt-12 grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4 lg:border-t-0">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;

            return (
              <article
                key={experience.title}
                className="group border-b border-black/10 py-7 sm:px-7 sm:py-8 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-8 lg:py-4"
              >
                {/* Number + icon */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-[0.16em] text-black/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Icon
                    className="h-[18px] w-[18px] text-black/35 transition-colors duration-300 group-hover:text-[#C52A0E]"
                    strokeWidth={1.25}
                  />
                </div>

                {/* Content */}
                <h3 className="font-display mt-12 text-[1.65rem] leading-none tracking-[-0.02em] text-[#11110F] transition-colors duration-300 group-hover:text-[#8A5A3C]">
                  {experience.title}
                </h3>

                <p className="mt-4 text-[13px] leading-6 text-black/55">
                  {experience.text}
                </p>

                <div className="mt-8 h-px w-8 bg-black/20 transition-all duration-500 group-hover:w-14 group-hover:bg-[#F67A05]" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}