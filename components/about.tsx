import { CheckCircle, MapPin } from "lucide-react"

export function About() {
  return (
    <section id="about" className="bg-muted py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              About <span className="text-primary">Ashwini Computer Center</span>
            </h2>
            <p className="mb-4 md:mb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
              Ashwini Computer Center (ACC) is an ISO 9001:2015 certified organization dedicated to providing quality
              computer education. As a National IT Development Organization affiliated with MEGABYTE CORPORATE, we have
              been shaping the future of students through comprehensive computer training programs.
            </p>

            <div className="mb-6 md:mb-8 space-y-2 md:space-y-3">
              {[
                "Government recognized certifications",
                "Experienced and qualified faculty",
                "Modern computer lab with latest equipment",
                "Flexible batch timings for students",
                "Practical-oriented training approach",
                "100% job assistance after course completion",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm md:text-base text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 md:space-y-4 rounded-xl bg-card p-4 md:p-6 shadow-sm">
              <h3 className="font-semibold text-foreground text-base md:text-lg">Our Branches</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm md:text-base">Head Branch</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Chitra More, Uperbandha Dumka Jamtara Road, Deoghar, Jharkhand - 814146
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm md:text-base">2nd Branch</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Bagdaha More, Fatehpur Jamtara Main Road, Near Bus Stand & Behind Hatiya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden sm:block">
            <div className="aspect-video overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl">
              <img
                src="/computer-training-center-classroom-students.jpg"
                alt="Students learning at Ashwini Computer Center"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 rounded-lg md:rounded-xl bg-primary p-4 md:p-6 text-primary-foreground shadow-xl">
              <div className="text-2xl md:text-4xl font-bold">10+</div>
              <div className="text-xs md:text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
