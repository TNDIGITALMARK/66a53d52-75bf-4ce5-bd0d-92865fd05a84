'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Clock, Users, ChefHat, Download, Eye, Heart, ShoppingBag, User, Settings } from 'lucide-react'
import { useState } from 'react'

interface PurchasedRecipe {
  id: string
  title: string
  image: string
  price: number
  purchaseDate: string
  rating: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  cookTime: string
  cuisine: string
  lastAccessed?: string
}

interface UserStats {
  totalRecipes: number
  totalSpent: number
  favoriteRecipes: number
  recipesMade: number
}

const mockPurchasedRecipes: PurchasedRecipe[] = [
  {
    id: 'butter-chicken',
    title: 'Authentic Butter Chicken',
    image: '/generated/butter-chicken.png',
    price: 5.99,
    purchaseDate: '2024-01-15',
    rating: 4.8,
    difficulty: 'Medium',
    cookTime: '45 min',
    cuisine: 'Indian',
    lastAccessed: '2024-01-20'
  },
  {
    id: 'palak-paneer',
    title: 'Creamy Palak Paneer',
    image: '/generated/palak-paneer.png',
    price: 4.99,
    purchaseDate: '2024-01-10',
    rating: 4.7,
    difficulty: 'Easy',
    cookTime: '30 min',
    cuisine: 'Indian',
    lastAccessed: '2024-01-18'
  },
  {
    id: 'thai-green-curry',
    title: 'Thai Green Curry',
    image: '/generated/thai-green-curry.png',
    price: 5.49,
    purchaseDate: '2024-01-08',
    rating: 4.6,
    difficulty: 'Easy',
    cookTime: '25 min',
    cuisine: 'Thai'
  }
]

const userStats: UserStats = {
  totalRecipes: 3,
  totalSpent: 16.47,
  favoriteRecipes: 2,
  recipesMade: 5
}

const mockRecommendations = [
  {
    id: 'biryani',
    title: 'Hyderabadi Chicken Biryani',
    image: '/generated/butter-chicken.png',
    price: 7.99,
    rating: 4.9,
    difficulty: 'Hard',
    cookTime: '120 min',
    cuisine: 'Indian'
  },
  {
    id: 'masala',
    title: 'Garam Masala Blend',
    image: '/generated/palak-paneer.png',
    price: 2.99,
    rating: 4.8,
    difficulty: 'Easy',
    cookTime: '10 min',
    cuisine: 'Indian'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('recipes')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="curry-gradient text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="w-8 h-8" />
              <span className="text-2xl font-merriweather font-bold">CurryCreations</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:text-yellow-200 transition-colors">Browse Recipes</Link>
              <Link href="/dashboard" className="text-yellow-200 font-semibold">My Dashboard</Link>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-merriweather font-bold text-gray-800 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">Manage your purchased recipes and discover new flavors</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{userStats.totalRecipes}</div>
              <div className="text-sm text-gray-600">Recipes Owned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">${userStats.totalSpent.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{userStats.favoriteRecipes}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.recipesMade}</div>
              <div className="text-sm text-gray-600">Recipes Made</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recipes">My Recipes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Purchased Recipes</h2>
              <Link href="/">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse More Recipes
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPurchasedRecipes.map((recipe) => (
                <Card key={recipe.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Purchased
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="outline" className="bg-white/90 border-none">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-merriweather font-semibold text-lg mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Purchased: {new Date(recipe.purchaseDate).toLocaleDateString()}
                      {recipe.lastAccessed && (
                        <div>Last accessed: {new Date(recipe.lastAccessed).toLocaleDateString()}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/recipe/${recipe.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                          <Eye className="w-4 h-4 mr-1" />
                          View Recipe
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockPurchasedRecipes.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 mb-4">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start building your recipe collection by purchasing your first recipe
                  </p>
                  <Link href="/">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      Browse Recipes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Favorite Recipes</h2>
              <p className="text-gray-600">Recipes you've marked as favorites</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPurchasedRecipes.slice(0, 2).map((recipe) => (
                <Card key={recipe.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        ❤️ Favorite
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-merriweather font-semibold text-lg mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                    </div>
                    <Link href={`/recipe/${recipe.id}`}>
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                        <Eye className="w-4 h-4 mr-1" />
                        View Recipe
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Recommended for You</h2>
              <p className="text-gray-600">Based on your purchase history and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecommendations.map((recipe) => (
                <Card key={recipe.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Recommended
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-merriweather font-semibold text-lg mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-bold text-orange-600">
                        ${recipe.price}
                      </div>
                      <Badge variant="outline">{recipe.difficulty}</Badge>
                    </div>
                    <Link href={`/recipe/${recipe.id}`}>
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/profile">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Get Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}