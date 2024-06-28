import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'test description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdG_DfmKqEg-pByrV7CCAXcrUzbQ-CWpX1uQ&s')
  ];

  constructor() {
    
  }

  ngOnInit(): void {
    
  }
}
