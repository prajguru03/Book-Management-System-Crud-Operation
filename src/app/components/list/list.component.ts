import { Component,OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule,NgIf,NgFor,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  books:any;
  currentBook:any;
  currentIndex=-1;
  searchTitle='';

  constructor(private bookService:BooksService){}

  ngOnInit(): void {
    
  }

  // Get All Book List

  getAllBook():void{
    this.bookService.list().subscribe((books:any)=>{
      this.books=books;
    },
  (error:any)=>{
    console.log(error);
    
  })
  }
  // Delete Book
 deleteBook(id:number){
  this.bookService.delete(id).subscribe(
    response=>{
      this.getAllBook();
    },(error:any)=>{
      console.log(error);
      
    }
  )
 }

//  Search Book
searchByTitle():void{
  this.bookService.filterByTitle(this.searchTitle).subscribe((books:any)=>{
    this.books=books;
  },(error:any)=>{
    console.log(error);
    
  }
)
}
}
