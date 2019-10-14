import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput',{static:false}) nameInputRef:ElementRef
  @ViewChild('amountInput',{static:false}) amountInputRef:ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredient>()
  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = this.amountInputRef.nativeElement.value
    this.ingredientAdded.emit(new Ingredient(ingName, ingAmount ))
  }
}