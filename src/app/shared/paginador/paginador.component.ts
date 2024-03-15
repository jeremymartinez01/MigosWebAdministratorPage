import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {
  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 5;
  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  startPage = 0;
  endPage = 0;
  pages: number[] = [];
  startingItem = 0;
  endingItem = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calculatePageInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('totalItems' in changes || 'currentPage' in changes) {
      this.calculatePageInfo();
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }

  private calculatePageInfo(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    this.endPage = Math.min(this.startPage + this.maxPages - 1, this.totalPages);

    this.pages = Array.from({ length: this.endPage - this.startPage + 1 }, (_, i) => this.startPage + i);

    this.startingItem = Math.min((this.currentPage - 1) * this.pageSize + 1, this.totalItems);
    this.endingItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}






  
