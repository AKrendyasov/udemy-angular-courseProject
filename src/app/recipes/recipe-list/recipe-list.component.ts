import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe ('Test recipe name', 'Some recipe test description', 'https://ghost.nehalist.io/content/images/2017/09/angular-logo-1.png'),
    new Recipe ('Test recipe name2', 'Some recipe test description2', 'https://ghost.nehalist.io/content/images/2017/09/angular-logo-1.png')
  ]
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe)
  }
}