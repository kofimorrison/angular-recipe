import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipeItem: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((pararms: Params) => {
      if (this.recipeService.getRecipes()[+pararms.id]) {
        this.id = +pararms.id;
        this.selectedRecipeItem = this.recipeService.getRecipe(this.id);
      } else {
        this.router.navigate(["../"], { relativeTo: this.route });
      }
    });
  }

  sendToShoppingList() {
    this.recipeService.addToSL(this.selectedRecipeItem.ingredients);
  }

  editRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
