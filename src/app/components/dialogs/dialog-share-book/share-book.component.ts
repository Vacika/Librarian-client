import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-share-book',
    templateUrl: './share-book.component.html',
    styleUrls: ['./share-book.component.css']
})
export class ShareBookDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ShareBookDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    copyText(inputElement){
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
      }
}
