export const dynamic = "force-dynamic"

import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedEbooks } from "@/components/home/FeaturedEbooks"
import { CategoryShowcase } from "@/components/home/CategoryShowcase"
import { FeaturesSection } from "@/components/home/FeaturesSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { NewsletterSection } from "@/components/home/NewsletterSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedEbooks />
      <CategoryShowcase />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
