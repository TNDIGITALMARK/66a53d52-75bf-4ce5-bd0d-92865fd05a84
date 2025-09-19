'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Star, Clock, Users, ChefHat, ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface Recipe {
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
  servings: number
  prepTime: string
  ingredients: string[]
  instructions: string[]
  tips: string[]
  nutritionFacts: {
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
  }
  chef: {
    name: string
    bio: string
    avatar: string
  }
}

const recipeData: Record<string, Recipe> = {
  'butter-chicken': {
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
    description: 'Rich, creamy tomato-based curry with tender chicken pieces, infused with aromatic spices and finished with butter and cream. This restaurant-quality recipe brings the flavors of India to your kitchen.',
    servings: 4,
    prepTime: '20 min',
    ingredients: [
      '2 lbs boneless chicken, cut into chunks',
      '1 cup heavy cream',
      '3 tbsp butter',
      '1 large onion, finely chopped',
      '4 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 tbsp tomato paste',
      '1 can (14oz) crushed tomatoes',
      '1 tsp garam masala',
      '1 tsp ground cumin',
      '1 tsp ground coriander',
      '1/2 tsp turmeric powder',
      '1/2 tsp paprika',
      '1/4 tsp cayenne pepper',
      'Salt to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Season chicken with salt and pepper. Heat oil in a large pan over medium-high heat.',
      'Cook chicken until golden brown on all sides. Remove and set aside.',
      'In the same pan, melt butter and sauté onions until golden, about 5 minutes.',
      'Add garlic and ginger, cook for 1 minute until fragrant.',
      'Stir in tomato paste and cook for 2 minutes.',
      'Add all spices and cook for 30 seconds until aromatic.',
      'Pour in crushed tomatoes and simmer for 10 minutes.',
      'Return chicken to the pan and simmer for 15 minutes.',
      'Stir in cream and cook for 5 more minutes.',
      'Garnish with fresh cilantro and serve with basmati rice.'
    ],
    tips: [
      'Marinate chicken in yogurt and spices for 2+ hours for best flavor',
      'Use whole spices and grind them fresh for maximum aroma',
      'Don\'t skip the cream - it balances the acidity of tomatoes',
      'Serve immediately with naan bread or basmati rice'
    ],
    nutritionFacts: {
      calories: 485,
      protein: '32g',
      carbs: '12g',
      fat: '36g',
      fiber: '3g'
    },
    chef: {
      name: 'Chef Priya Sharma',
      bio: 'Master of North Indian cuisine with 15+ years of experience',
      avatar: '/avatars/chef-priya.jpg'
    }
  },
  'lamb-vindaloo': {
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
    description: 'Fiery Portuguese-influenced curry with tender lamb, featuring a complex blend of spices and tangy vinegar. This authentic Goan recipe delivers intense heat and incredible depth of flavor.',
    servings: 6,
    prepTime: '30 min',
    ingredients: [
      '3 lbs lamb shoulder, cut into chunks',
      '15 dried red chilies',
      '2 tsp cumin seeds',
      '1 tsp black peppercorns',
      '1 inch cinnamon stick',
      '4 cloves',
      '6 cloves garlic',
      '2 inch ginger piece',
      '1/4 cup malt vinegar',
      '2 large onions, sliced',
      '2 tsp brown sugar',
      '1 tsp turmeric',
      'Salt to taste',
      '3 tbsp vegetable oil'
    ],
    instructions: [
      'Soak dried chilies in warm water for 15 minutes.',
      'Dry roast cumin, peppercorns, cinnamon, and cloves until fragrant.',
      'Blend soaked chilies, roasted spices, garlic, ginger, and vinegar into a smooth paste.',
      'Marinate lamb with spice paste, turmeric, and salt for 2+ hours.',
      'Heat oil in a heavy-bottomed pot over medium heat.',
      'Cook onions until golden brown and caramelized.',
      'Add marinated lamb and cook for 10 minutes.',
      'Add brown sugar and 1 cup water. Bring to a boil.',
      'Reduce heat, cover, and simmer for 60-75 minutes until tender.',
      'Adjust seasoning and serve with steamed rice.'
    ],
    tips: [
      'Use Kashmiri chilies for color and mild heat, bird\'s eye for fire',
      'Marinating overnight develops the best flavor',
      'The curry tastes better the next day - make ahead!',
      'Serve with cooling raita to balance the heat'
    ],
    nutritionFacts: {
      calories: 545,
      protein: '38g',
      carbs: '8g',
      fat: '42g',
      fiber: '2g'
    },
    chef: {
      name: 'Chef Miguel D\'Souza',
      bio: 'Goan cuisine specialist preserving traditional recipes',
      avatar: '/avatars/chef-miguel.jpg'
    }
  },
  'palak-paneer': {
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
    description: 'Fresh spinach curry with homemade paneer cheese, cooked with aromatic spices and finished with cream. A healthy and delicious vegetarian favorite.',
    servings: 4,
    prepTime: '15 min',
    ingredients: [
      '1 lb fresh spinach, washed',
      '8oz paneer, cubed',
      '1 large onion, chopped',
      '3 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 green chilies, slit',
      '1 tomato, chopped',
      '1/2 cup heavy cream',
      '1 tsp cumin seeds',
      '1 tsp garam masala',
      '1/2 tsp turmeric',
      'Salt to taste',
      '3 tbsp ghee or oil'
    ],
    instructions: [
      'Blanch spinach in boiling water for 2 minutes, then ice bath.',
      'Blend blanched spinach into a smooth puree.',
      'Heat ghee in a pan, lightly fry paneer cubes until golden. Set aside.',
      'In the same pan, add cumin seeds and let them splutter.',
      'Add onions and cook until golden brown.',
      'Add garlic, ginger, and green chilies. Cook for 1 minute.',
      'Add tomatoes and cook until soft.',
      'Add turmeric and garam masala, cook for 30 seconds.',
      'Pour in spinach puree and simmer for 5 minutes.',
      'Add paneer, cream, and salt. Simmer for 3-4 minutes.',
      'Serve hot with naan or rice.'
    ],
    tips: [
      'Ice bath keeps spinach bright green',
      'Don\'t overcook paneer - it becomes rubbery',
      'Add a pinch of sugar to balance flavors',
      'Fresh homemade paneer tastes best'
    ],
    nutritionFacts: {
      calories: 325,
      protein: '18g',
      carbs: '12g',
      fat: '24g',
      fiber: '4g'
    },
    chef: {
      name: 'Chef Anjali Patel',
      bio: 'Vegetarian cuisine expert and cookbook author',
      avatar: '/avatars/chef-anjali.jpg'
    }
  },
  'thai-green-curry': {
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
    description: 'Aromatic coconut curry with Thai basil and vegetables, featuring a fragrant green curry paste and tender chicken in rich coconut milk.',
    servings: 4,
    prepTime: '15 min',
    ingredients: [
      '1 lb chicken thighs, sliced',
      '2 cans (14oz each) coconut milk',
      '3 tbsp Thai green curry paste',
      '1 Thai eggplant, cubed',
      '1 bell pepper, sliced',
      '4 kaffir lime leaves',
      '1 cup Thai basil leaves',
      '2 tbsp fish sauce',
      '1 tbsp palm sugar',
      '2 red chilies, sliced',
      '1 tbsp vegetable oil'
    ],
    instructions: [
      'Heat oil in a wok over medium-high heat.',
      'Fry curry paste for 2 minutes until fragrant.',
      'Add thick coconut cream (from can top) and fry for 3 minutes.',
      'Add chicken and cook until almost done.',
      'Pour in remaining coconut milk and bring to a simmer.',
      'Add eggplant, bell pepper, and lime leaves.',
      'Season with fish sauce and palm sugar.',
      'Simmer for 8-10 minutes until vegetables are tender.',
      'Stir in Thai basil and red chilies.',
      'Serve immediately with jasmine rice.'
    ],
    tips: [
      'Use coconut cream first for richer flavor',
      'Don\'t overcook vegetables - keep them crisp',
      'Adjust sweetness and saltiness to taste',
      'Fresh Thai basil is essential for authentic flavor'
    ],
    nutritionFacts: {
      calories: 420,
      protein: '28g',
      carbs: '15g',
      fat: '32g',
      fiber: '3g'
    },
    chef: {
      name: 'Chef Siriporn Tanaka',
      bio: 'Bangkok-trained chef specializing in authentic Thai flavors',
      avatar: '/avatars/chef-siriporn.jpg'
    }
  }
}

const SpiceLevelIndicator = ({ level }: { level: 1 | 2 | 3 | 4 | 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < level
              ? `spice-level-${level}`
              : 'bg-gray-200'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {level === 1 ? 'Mild' : level === 2 ? 'Medium' : level === 3 ? 'Spicy' : level === 4 ? 'Very Spicy' : 'Extremely Hot'}
      </span>
    </div>
  )
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [isPurchased, setIsPurchased] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const recipe = recipeData[params.id]

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handlePurchase = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsPurchased(true)
    setIsLoading(false)
  }

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
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Image and Purchase */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {recipe.cuisine}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline" className="bg-white/90 border-none">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90 border-none">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${recipe.price}
                  </div>
                  <p className="text-gray-600 mb-4">Premium Recipe Access</p>
                  {!isPurchased ? (
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700 mb-4"
                      onClick={handlePurchase}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Purchase Recipe
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="text-center">
                      <div className="text-green-600 font-semibold mb-2">✅ Purchased!</div>
                      <Button variant="outline" className="w-full">
                        Download PDF
                      </Button>
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    Lifetime access • Money-back guarantee
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recipe Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-merriweather font-bold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {recipe.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{recipe.rating}</span>
                  <span className="text-gray-500">({recipe.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Serves: {recipe.servings}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Difficulty</h4>
                  <Badge variant={recipe.difficulty === 'Easy' ? 'default' : recipe.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Spice Level</h4>
                  <SpiceLevelIndicator level={recipe.spiceLevel} />
                </div>
              </div>
            </div>

            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="mt-6">
                {!isPurchased ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Ingredients List</h3>
                        <p className="text-gray-600">Purchase this recipe to view the complete ingredients list with exact measurements.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Preview: Chicken, cream, butter, onion, garlic, ginger, spices...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="instructions" className="mt-6">
                {!isPurchased ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Cooking Instructions</h3>
                        <p className="text-gray-600">Purchase this recipe to access detailed step-by-step cooking instructions.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Step-by-step instructions with timing and techniques...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                      <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex gap-4">
                            <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="pt-1">{instruction}</p>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="tips" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Chef Tips</h3>
                    <ul className="space-y-3">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Nutrition Facts</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{recipe.nutritionFacts.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{recipe.nutritionFacts.protein}</div>
                        <div className="text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{recipe.nutritionFacts.carbs}</div>
                        <div className="text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{recipe.nutritionFacts.fat}</div>
                        <div className="text-sm text-gray-600">Fat</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{recipe.nutritionFacts.fiber}</div>
                        <div className="text-sm text-gray-600">Fiber</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Chef Info */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">About the Chef</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <ChefHat className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{recipe.chef.name}</h4>
                    <p className="text-gray-600">{recipe.chef.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}