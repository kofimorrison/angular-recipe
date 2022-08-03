import { Ingredient } from "./../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientschanged = new Subject<Ingredient[]>();
  startedEditting = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return this.ingredients[i];
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientschanged.next(this.ingredients.slice());
  }

  updateIngredient(i: number, ingredient: Ingredient) {
    this.ingredients[i] = ingredient;
    this.ingredientschanged.next(this.ingredients.slice());
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientschanged.next(this.ingredients.slice());
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientschanged.next(this.ingredients.slice());
  }
}
