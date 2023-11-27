import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() maxPages: number = 5;
  @Output() pageChange = new EventEmitter<number>();

  totalPages: number;
  startPage: number;
  endPage: number;
  pages: number[];
  startingItem: number;
  endingItem: number;

  constructor() {
    this.totalPages = 0;
    this.startPage = 0;
    this.endPage = 0;
    this.pages = [];
    this.startingItem = 0;
    this.endingItem = 0;
  }

  ngOnInit() {
    this.calculatePageInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('totalItems' in changes || 'currentPage' in changes) {
      this.calculatePageInfo();
    }
  }

  private calculatePageInfo() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    this.endPage = Math.min(this.startPage + this.maxPages - 1, this.totalPages);

    this.pages = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.pages.push(i);
    }

    this.startingItem = Math.min((this.currentPage - 1) * this.pageSize + 1, this.totalItems);
    this.endingItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  selectPage(page: number):void {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}