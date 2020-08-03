import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/Board';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, CreateBoardComponent],
})
export class DashboardComponent implements OnInit {
  boards: Array<Board> = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.newBoardSubject.subscribe((data) => {
      this.boards.push(data);
    });

    this.dashboardService.getAll().subscribe((boards) => {
      boards.forEach((board) => {
        this.boards.push(board);
      });
    });
  }

  goToCreate() {
    this.router.navigate(['/create-board']);
  }

  deleteBoard(event, id) {
    event.stopPropagation();
    this.dashboardService.delete(id).subscribe(() => {
      const index = this.boards.findIndex((board) => board.id === id);
      this.boards.splice(index, 1);
    });
  }

  redirectTo(board) {
    this.router.navigate(['/retrospective', board.id]);
  }
}
