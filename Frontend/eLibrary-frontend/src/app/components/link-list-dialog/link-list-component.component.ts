import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UpdateLinkDialogComponent } from '../update-link-dialog/update-link-dialog.component';
import { Link } from 'src/app/entities/link';

@Component({
  selector: 'app-link-list-component',
  templateUrl: './link-list-component.component.html',
  styleUrls: ['./link-list-component.component.css']
})
export class LinkListComponentComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  links: Link[];
  dataSource;
  trunc = 15;
  displayedColumns: string[] = ['id', 'book_title', 'pdf_key','audio_key', 'photo_key', 'action']
  constructor(private dialog: MatDialog, 
    private apiService: ApiService, 
    private _liveAnnouncer: LiveAnnouncer, 
    private dialogRef: MatDialogRef<LinkListComponentComponent>){}

  ngOnInit() {
    this.loadLinks();
  }

  loadLinks() {
    this.apiService.getLinks().subscribe(
      (links: Link[]) => {
        this.links = links;
        this.dataSource = new MatTableDataSource<Link>(this.links);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error retrieving user list:', error);
      }
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateLink(link: Link){
    this.dialogRef.close();
    this.dialog.open(UpdateLinkDialogComponent, {data: link});
  }
}
