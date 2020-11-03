import { Injectable } from '@angular/core';
import {  Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverGuard implements Resolve<Recipe[]> {
  constructor(
      private dataStorageService: DataStorageService,
      private recipeService: RecipeService,

  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    const recipes = this.recipeService?.getRecipes();
    return recipes?.length ? recipes : this.dataStorageService.fetchRecipes();

  }
}
