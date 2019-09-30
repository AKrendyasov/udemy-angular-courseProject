import { Component, OnInit } from '@angular/core';

import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe ('Test name', 'Some test description', 'https://ghost.nehalist.io/content/images/2017/09/angular-logo-1.png')
  ]
  constructor() { }

  ngOnInit() {
  }

}