import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   "Meat loaf",
    //   "American-style ground meat",
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7DcuZN3TbA-YzYGIj0ZT7yG6F-EqT5YcVcyW8RAZDH6xY-vHI&usqp=CAU",
    //   [new Ingredient("Meat", 3), new Ingredient("Oil", 1)]
    // ),
    // new Recipe(
    //   "Fufu",
    //   "Ghanaian Delicacy",
    //   "https://myrecipejoint.com/wp-content/uploads/2019/07/923201784830_fufu1.jpg",
    //   [new Ingredient("Plantain", 5), new Ingredient("Cassava", 3)]
    // ),
    // new Recipe(
    //   "Waakye",
    //   "Mixture of Rice and Beans",
    //   "https://lamskitchengh.com/wp-content/uploads/2019/05/Waakye.jpg",
    //   [new Ingredient("Rice", 2), new Ingredient("Beans", 4)]
    // ),
  ];

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice(); // returns new array or copy of recipe array;
  }
  setRecipes(res: Recipe[]) {
    this.recipes = res;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(i: number) {
    return this.recipes[i];
  }
  addToSL(ingredients: Ingredient[]) {
    this.slService.setIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
