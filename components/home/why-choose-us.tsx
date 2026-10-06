import {
  Award,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const reasons = [
  {
    number: "01",
    icon: Compass,
    title: "Local Knowledge",
    text: "Our understanding of Tanzania helps us take you beyond the obvious and into experiences that feel genuinely connected to place.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Tailor-Made Journeys",
    text: "Your safari should feel like yours. We shape routes, stays and experiences around your interests and pace.",
  },
  {
    number: "03",
    icon: Users,
    title: "Personal Service",
    text: "From your first conversation to the end of your journey, you have a team focused on making travel simple.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Trusted Planning",
    text: "We carefully coordinate the details so you can spend less time worrying about logistics and more time experiencing Africa.",
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "Responsible Travel",
    text: "We believe memorable tourism should respect wildlife, communities, people and the places that make Tanzania special.",
  },
  {
    number: "06",
    icon: Award,
    title: "Exceptional Experiences",
    text: "We focus on the details that turn a good holiday into the journey you will still be talking about years later.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#080808] px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#F67A05]" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F67A05]">
                Why Ndauwo
              </p>
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Travel with
              <br />
              <span className="text-[#F67A05]">purpose.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base">
              We don't just arrange trips. We create carefully considered
              experiences that connect travelers with Tanzania.
            </p>
          </div>

          <div className="grid border-l border-white/10 sm:grid-cols-2">
            {reasons.map(({ number, icon: Icon, title, text }) => (
              <div
                key={number}
                className="border-b border-white/10 p-6 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-6 w-6 text-[#F67A05]" />

                  <span className="text-xs font-bold tracking-widest text-white/25">
                    {number}
                  </span>
                </div>

                <h3 className="mt-8 text-lg font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}