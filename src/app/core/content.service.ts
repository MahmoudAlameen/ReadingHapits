import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ArticlePage } from '../classes/ArticlePage';
import { BookPage } from '../classes/BookPage';
import { Page } from '../classes/Page';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http:HttpClient) { }

  getFile(fileName:string,type:string,relation:string):Observable<string>
  {
    //let url="http://localhost:60840/api/UploadImages/seendFile";
    
    let url="./assets/json/file.json"
    // return this.http.get(url,{responseType:'blob',params:{fileName:fileName,type:type,relation:relation}}).pipe(
    //   catchError((err)=>{
    //     return throwError(()=>err.message);
    //   })
    // )

    return this.http.get<string>(url).pipe(
      catchError((err)=>{
        return throwError(()=>err.message);
      })
    )

  }


  getBookPages(bookId:number):Observable<BookPage[]>
  {
    let url:string="./assets/json/bookPages.json";
    return this.getPages<BookPage[]>(url,bookId);

  }
  getArticlePages(articleId:number):Observable<ArticlePage[]>
  {
    let url:string="./assets/json/articlePages.json";
    return this.http.get<ArticlePage[]>(url).pipe(catchError(     // for test onle
      err=> throwError(()=>err.message) 
    )
    )
   
    // return this.getPages<ArticlePage[]>(url,articleId); 
  }
  private getPages<T>(url:string,id:number):Observable<T>
  {
    return this.http.get<T>(url,{params:{id:id}}).pipe(catchError(
      err=> throwError(()=>err.message)
    ))

  }
  public readFile(page:Page,file:Blob)
  {
    let reader=new FileReader();
    switch(page.type)
    {
      case "text":
        reader.readAsText(file);
        break;
      case "image":
        reader.readAsDataURL(file);
        break;

    }
    reader.onload=()=>
    {
      page.content=reader.result as string;
    }
  }

  sortPages(pages:Page[])
  {
    let result:Page[]=[];
    result.length=pages.length;
    for(let i=0; i<pages.length; i++)
    {
      result[pages[i].number]=pages[i];
    }
  }
}
