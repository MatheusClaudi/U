import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qrcode-retrospective',
  templateUrl: './qrcode-retrospective.component.html',
  styleUrls: ['./qrcode-retrospective.component.css'],
})
export class QrcodeRetrospectiveComponent implements OnInit {
  title = 'Compartilhe com os devs';
  elementType = 'url';
  public boardID: number;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.boardID = params['id'];
    });
  }

  ngOnInit(): void {}
}
