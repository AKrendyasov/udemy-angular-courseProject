import { Recipe } from './recipe.model'

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe ('Test recipe name', 'Some recipe test description', 'https://ghost.nehalist.io/content/images/2017/09/angular-logo-1.png'),
    new Recipe ('Test recipe name2', 'Some recipe test description2', 'https://ghost.nehalist.io/content/images/2017/09/angular-logo-1.png')
  ]

  getRecipes () {
    return this.recipes.slice()
  }
}