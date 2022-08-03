import { Subscription } from "rxjs";
import { Ingredient } from "./../../shared/ingredient.model";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  itemIndex: number;
  editMode = false;
  selectedIngredient: Ingredient;

  constructor(private slService: ShoppingListService) {}

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.itemIndex, newIngredient);
    } else {
      this.slService.onIngredientAdded(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnInit() {
    this.subscription = this.slService.startedEditting.subscribe(
      (i: number) => {
        this.editMode = true;
        this.itemIndex = i;
        this.selectedIngredient = this.slService.getIngredient(i);
        this.slForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount,
        });
      }
    );
  }

  delete() {
    this.slService.deleteIngredient(this.itemIndex);
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
