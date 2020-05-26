import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {Router} from "@angular/router";
import {List} from "../models/list.model";
import {ListService} from "../services/list.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-main-page-component',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, OnDestroy {

  tempId: string;
  lists: List[];
  public userId: string;
  listSubscritpiton: Subscription;

  constructor(private listService: ListService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this.auth.userId
    this.listSubscritpiton = this.listService.list$.subscribe(
      (lists: List[]) => {
        this.lists = lists;
      }
    );
    this.listService.getList();
    this.listService.emitList();
  }

  onNewList() {
    this.router.navigate(['/lists/new']);
  }

  onDeleteList(id: string){
    this.listService.deleteList(id);
  }

  onViewList(id: string) {
    this.router.navigate(['/lists/view/'+ id]);
  }
  ngOnDestroy()
  {
    this.listSubscritpiton.unsubscribe();
  }

}
