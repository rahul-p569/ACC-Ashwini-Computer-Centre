export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://ashwinicomputer.com/#organization",
    name: "ACC Computer Center - Ashwini Computer Centre",
    alternateName: ["ACC Computer Center", "ACC Computer Centre", "Ashwini Computer Center", "Ashwini Computer Centre"],
    url: "https://ashwinicomputer.com",
    logo: "https://ashwinicomputer.com/acc-logo.png",
    image: "https://ashwinicomputer.com/acc-logo.png",
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
    email: "info@ashwinicomputer.com",
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
            name: "Basic Computer Course",
            description: "Learn fundamental computer skills and operations",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Typing Course",
            description: "Master typing skills with speed and accuracy",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Tally Course",
            description: "Learn Tally accounting software for business management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "DTP Course",
            description: "Desktop Publishing course for design and layout",
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
    image: "https://ashwinicomputer.com/acc-logo.png",
    url: "https://ashwinicomputer.com",
    telephone: "+917903060859",
    email: "info@ashwinicomputer.com",
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

