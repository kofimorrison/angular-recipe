import { RecipeService } from "./../recipe.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import * as firebase from "firebase";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-recipe-start",
  templateUrl: "./recipe-start.component.html",
  styleUrls: ["./recipe-start.component.css"],
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  // @ViewChild("f", { static: false }) slForm: NgForm;
  private userSub: Subscription;
  startText: string;
  recipes = [];
  // fileToUpload: File = null;
  // name: string;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
      if (recipes.length > 0) {
        this.startText = "Please select a Recipe";
      }
    });
    this.userSub = this.authService.user.subscribe((user) => {
      const rec = this.recipeService.getRecipes();
      if (user && rec.length === 0) {
        this.startText = "Please fetch Recipes";
      } else if (user && rec.length > 0) {
        this.startText = "Please select a Recipe";
      } else if (!user) {
        this.startText = "Please authenticate / Login";
      }
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  // }

  // uploadFileToActivity() {
  //   const storageRef = firebase.storage().ref(this.name);
  //   storageRef.put(this.fileToUpload);
  // }
  // onSubmit(f: NgForm) {
  //   this.name = f.value.name;
  // }
  // getFile(data) {
  //   const storageRef = firebase.storage().ref(data);
  //   storageRef.getDownloadURL().then((x) => console.log(x));
  // }
}
