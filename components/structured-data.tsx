export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://ashwinicomputer.com/#organization",
    name: "ACC Computer Center - Ashwini Computer Centre",
    alternateName: ["ACC Computer Center", "ACC Computer Centre", "Ashwini Computer Center", "Ashwini Computer Centre"],
    url: "https://ashwinicomputer.com",
    logo: "https://ashwinicomputer.com/Logo-removebg-preview.png",
    image: "https://ashwinicomputer.com/Logo-removebg-preview.png",
    description:
      "ACC Computer Center (Ashwini Computer Centre) is an ISO 9001:2015 certified computer training institute in Deoghar, Jharkhand. We offer quality computer education including Basic Computer, Typing, Tally, DTP, and Programming courses.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Deoghar",
        addressRegion: "Jharkhand",
        postalCode: "814146",
        streetAddress: "Chitra More, Uperbandha Dumka Jamtara Road",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Deoghar",
        addressRegion: "Jharkhand",
        streetAddress: "Bagdaha More, Fatehpur Jamtara Main Road, Near Bus Stand & Behind Hatiya",
        addressCountry: "IN",
      },
    ],
    telephone: "+917903060859",
    email: "ashwinicomputercenter@gmail.com",
    foundingDate: "2014",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10+",
    },
    areaServed: {
      "@type": "City",
      name: "Deoghar",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Computer Training Courses",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "DCA - Diploma in Computer Applications",
            description: "Comprehensive diploma course covering fundamental computer applications, MS Office, and basic programming concepts",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Tally Prime with GST",
            description: "Master Tally accounting software with GST implementation. Learn financial accounting, inventory management, and taxation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "DTP - Desktop Publishing",
            description: "Learn graphic design and desktop publishing using industry-standard software for creating professional layouts and designs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "DFA - Diploma in Financial Accounting",
            description: "Advanced course in financial accounting principles, bookkeeping, and financial statement preparation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "ADCA - Advanced Diploma in Computer Applications",
            description: "Advanced level course covering advanced computer applications, programming, database management, and software development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "CCC - Course on Computer Concepts",
            description: "NIELIT certified course covering basic computer concepts, internet, email, and digital literacy essentials",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Internet & Scanning",
            description: "Learn internet browsing, email management, online tools, and document scanning techniques",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "English & Hindi Typing",
            description: "Master typing skills in both English and Hindi. Improve speed and accuracy for professional typing requirements",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Online Government Exam Practice",
            description: "Practice for various government exams with online mock tests, previous year papers, and exam preparation guidance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "HTML Web Development",
            description: "Learn HTML fundamentals for web development. Create and structure web pages using HTML5 standards",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "School Level Computer Courses",
            description: "Specialized computer courses designed for school students to enhance their digital skills and academic performance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Test & Practice Facilities",
            description: "Access to computer lab facilities for practice tests, mock exams, and hands-on training sessions",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
    sameAs: [
      // Add your social media profiles here when available
      // "https://www.facebook.com/ashwinicomputer",
      // "https://www.instagram.com/ashwinicomputer",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ashwinicomputer.com/#localbusiness",
    name: "ACC Computer Center - Ashwini Computer Centre",
    alternateName: ["ACC Computer Center", "ACC Computer Centre"],
    image: "https://ashwinicomputer.com/Logo-removebg-preview.png",
    url: "https://ashwinicomputer.com",
    telephone: "+917903060859",
    email: "ashwinicomputercenter@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chitra More, Uperbandha Dumka Jamtara Road",
      addressLocality: "Deoghar",
      addressRegion: "Jharkhand",
      postalCode: "814146",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.4815",
      longitude: "86.7025",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    servesCuisine: "Computer Education and Training",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}

