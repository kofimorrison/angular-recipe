import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { RecipeService } from "./../recipe.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
