import Navbar from "@/components/navbar"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-coffee-light py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-cream-light mb-8">About BrewEase</h1>

          <div className="bg-coffee-medium/80 rounded-lg overflow-hidden mb-12">
            <div className="relative h-64 md:h-80">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Coffee shop interior"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-cream-light mb-4">Our Story</h2>
              <p className="text-cream-light/90 mb-4">
                BrewEase was founded in 2023 with a simple mission: to make quality coffee more accessible and
                convenient for everyone. We believe that great coffee shouldn't be complicated or time-consuming.
              </p>
              <p className="text-cream-light/90">
                Our team of passionate coffee enthusiasts has created a platform that combines the art of coffee-making
                with the convenience of modern technology, allowing you to order your perfect brew with just a few taps.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-coffee-medium/80 rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold text-cream-light mb-4">Our Coffee</h2>
              <p className="text-cream-light/90 mb-4">
                We source our beans from sustainable farms around the world, ensuring that every cup you enjoy is not
                only delicious but also ethically produced.
              </p>
              <p className="text-cream-light/90">
                Our expert baristas craft each drink with precision and care, creating the perfect balance of flavors to
                satisfy your coffee cravings.
              </p>
            </div>

            <div className="bg-coffee-medium/80 rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold text-cream-light mb-4">Meet BeanBot</h2>
              <p className="text-cream-light/90 mb-4">
                BeanBot is our AI-powered coffee assistant, designed to help you discover new flavors and find your
                perfect coffee match.
              </p>
              <p className="text-cream-light/90">
                Whether you're a coffee connoisseur or just starting your coffee journey, BeanBot can provide
                personalized recommendations based on your preferences and help you explore our menu with ease.
              </p>
            </div>
          </div>

          <div className="bg-coffee-medium/80 rounded-lg p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-cream-light mb-4">Visit Us</h2>
            <p className="text-cream-light/90 mb-4">
              While our app makes ordering coffee convenient, we also invite you to visit our physical locations and
              experience the warm, inviting atmosphere of our coffee shops.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-bold text-cream-light mb-2">Main Branch</h3>
                <p className="text-cream-light/90">123 Coffee Street</p>
                <p className="text-cream-light/90">Metro Manila, Philippines</p>
                <p className="text-cream-light/90">Open daily: 7AM - 10PM</p>
              </div>
              <div>
                <h3 className="font-bold text-cream-light mb-2">Contact Us</h3>
                <p className="text-cream-light/90">Email: hello@brewease.com</p>
                <p className="text-cream-light/90">Phone: +63 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
