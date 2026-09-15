import { Site } from "@/components/Site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Yōkoso",
  servesCuisine: ["Japanese", "Chinese", "Thai", "Pan-Asian"],
  priceRange: "৳৳",
  telephone: "+8801841965676",
  url: "https://yokoso.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Madani Tower, 2nd Floor, Mirboxtula, Ambarkhana",
    addressLocality: "Sylhet",
    addressCountry: "BD",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "12:00",
    closes: "23:00",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Site />
    </>
  );
}
