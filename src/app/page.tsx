import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Users, ChefHat, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface RecipeCard {
  id: string
  title: string
  image: string
  price: number
  rating: number
  reviewCount: number
  cookTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  spiceLevel: 1 | 2 | 3 | 4 | 5
  cuisine: string
  description: string
}

const featuredRecipes: RecipeCard[] = [
  {
    id: 'butter-chicken',
    title: 'Authentic Butter Chicken',
    image: '/generated/butter-chicken.png',
    price: 5.99,
    rating: 4.8,
    reviewCount: 127,
    cookTime: '45 min',
    difficulty: 'Medium',
    spiceLevel: 2,
    cuisine: 'Indian',
    description: 'Rich, creamy tomato-based curry with tender chicken pieces'
  },
  {
    id: 'lamb-vindaloo',
    title: 'Goan Lamb Vindaloo',
    image: '/generated/lamb-vindaloo.png',
    price: 6.99,
    rating: 4.9,
    reviewCount: 89,
    cookTime: '90 min',
    difficulty: 'Hard',
    spiceLevel: 5,
    cuisine: 'Indian',
    description: 'Fiery Portuguese-influenced curry with tender lamb'
  },
  {
    id: 'palak-paneer',
    title: 'Creamy Palak Paneer',
    image: '/generated/palak-paneer.png',
    price: 4.99,
    rating: 4.7,
    reviewCount: 156,
    cookTime: '30 min',
    difficulty: 'Easy',
    spiceLevel: 2,
    cuisine: 'Indian',
    description: 'Fresh spinach curry with homemade paneer cheese'
  },
  {
    id: 'thai-green-curry',
    title: 'Thai Green Curry',
    image: '/generated/thai-green-curry.png',
    price: 5.49,
    rating: 4.6,
    reviewCount: 203,
    cookTime: '25 min',
    difficulty: 'Easy',
    spiceLevel: 3,
    cuisine: 'Thai',
    description: 'Aromatic coconut curry with Thai basil and vegetables'
  }
]

const SpiceLevelIndicator = ({ level }: { level: 1 | 2 | 3 | 4 | 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level
              ? `spice-level-${level}`
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="curry-gradient text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="w-8 h-8" />
              <span className="text-2xl font-merriweather font-bold">CurryCreations</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-yellow-200 transition-colors">Home</Link>
              <Link href="/recipes" className="hover:text-yellow-200 transition-colors">Recipes</Link>
              <Link href="/spices" className="hover:text-yellow-200 transition-colors">Spices</Link>
              <Link href="/blog" className="hover:text-yellow-200 transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-yellow-200 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 cursor-pointer hover:text-yellow-200 transition-colors" />
              <Link href="/dashboard">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/hero-curry.png"
            alt="Delicious curry dishes"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-5xl md:text-6xl font-merriweather font-bold text-gray-800 mb-6">
              EXPLORE FLAVORS, MASTER CURRY
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Authentic Recipes from Around the World
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                Browse Recipes
              </Button>
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-merriweather font-bold text-gray-800 mb-4">
              Featured Spices
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular curry recipes, each crafted with authentic spices and traditional techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <Card key={recipe.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {recipe.cuisine}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <SpiceLevelIndicator level={recipe.spiceLevel} />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-merriweather font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                      <span className="text-sm text-gray-500">({recipe.reviewCount})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">${recipe.price}</div>
                      <Link href={`/recipe/${recipe.id}`}>
                        <Button size="sm" className="mt-1 bg-orange-600 hover:bg-orange-700">
                          View Recipe
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 curry-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-merriweather font-bold mb-4">
            JOIN OUR CULINARY COMMUNITY
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get access to premium curry recipes and connect with fellow food lovers
          </p>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3">
            Join Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="w-6 h-6" />
                <span className="text-xl font-merriweather font-bold">CurryCreations</span>
              </div>
              <p className="text-gray-400">
                Authentic curry recipes from master chefs around the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/legal" className="hover:text-white transition-colors">Legal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/indian" className="hover:text-white transition-colors">Indian</Link></li>
                <li><Link href="/thai" className="hover:text-white transition-colors">Thai</Link></li>
                <li><Link href="/malaysian" className="hover:text-white transition-colors">Malaysian</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">Follow us for daily recipe inspiration</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CurryCreations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}