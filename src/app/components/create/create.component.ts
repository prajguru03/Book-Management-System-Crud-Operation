import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent implements OnInit {

  book = {
    id: '',
    title: '',
    description: ''
  }
  isBookAdded: boolean = false;
  constructor(private bookService: BooksService) { }
  ngOnInit(): void { }

  // Add New Book

  addBook() {
    const data = {
      id: this.book.id,
      title: this.book.title,
      description: this.book.description
    };

    if (!data.title) {
      alert("Please Add Book Title...!")
      return
    }

    this.bookService.create(data).subscribe(response => {
      console.log(response);
      this.isBookAdded = true
    },
      error => {
        console.log(error);

      });
  }

  // Reset on Additing Book
  newBook() {
    this.isBookAdded=false;
    this.book={
      id:'',
      title:'',
      description:'',
    };
  }


  
}
