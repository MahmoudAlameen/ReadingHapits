import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {
  // Change the type to Uint8Array to hold the binary data
  pdfSrc!: Uint8Array | string ; 
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  afterLoadComplete(pdf: any) {
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
  }

  // ... (nextPage and prevPage methods remain the same)
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  ngOnInit(): void {
    const url = './assets/pdf/pdf-test.pdf'; // Use a correct URL for your PDF

    this.getPdfFile(url).subscribe(
      (blob: Blob) => {
        console.log("blobl" );
        console.log(blob);
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // 1. Cast the result to ArrayBuffer
          const arrayBuffer = e.target.result as ArrayBuffer;
          
          // 2. Convert ArrayBuffer to Uint8Array, which ng2-pdf-viewer prefers
          this.pdfSrc = new Uint8Array(arrayBuffer);
          
          console.log('PDF data loaded as Uint8Array');
        };

        // 3. Read the Blob as an ArrayBuffer
        reader.readAsArrayBuffer(blob);
      },
      (error) => {
        console.error('Error fetching PDF:', error);
      }
    );
  }

  getPdfFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(
        (err) => {
          console.error(err);
          return throwError(() => new Error('Failed to load PDF file.'));
        }
      )
    );
  }
}
