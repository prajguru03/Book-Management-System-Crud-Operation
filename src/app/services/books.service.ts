import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { error, log } from 'console';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiUrl: string = 'http://localhost:3000/books';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  // API ErrorHandling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Error Occurred`, error.error.message);
    } else {
      console.error(`Backend return code: ${error.status}` +
        `Body Was:${error.error}`
      )
    };
    console.log("Error Occurred", error);
    return throwError(() => `Something went wrong,Try Again....!`);
  }

  // Show List of Books
  list(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Create new Item
  getItem(id:any):Observable<any>{
    console.log(`Getting Book with ID:`,id);
    return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data:any):Observable<any>{
    return this.httpClient.post(this.apiUrl,data).pipe(
      catchError(this.handleError)
    );
  }

  // Update or Edit Details

  update(id:any,data:any):Observable<any>{
    return this.httpClient.post(this.apiUrl,data).pipe(
      catchError(this.handleError)
    )
  }

  // Delete
  
  delete(id:any):Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // Search by Title

  filterByTitle(title:any):Observable<any>{
    return this.httpClient.get(`${this.apiUrl}?title_like=${title}`).pipe(
      catchError(this.handleError)
    )
  }
}



