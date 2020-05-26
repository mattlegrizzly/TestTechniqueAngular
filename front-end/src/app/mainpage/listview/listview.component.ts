import { Component, OnInit } from '@angular/core';
import {List} from "../../models/list.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ListService} from "../../services/list.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Object} from "../../models/object.model";
import {formatNumber} from "@angular/common";

class StuffService {
}

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  liste: List;

  public coursesForm: FormGroup;
  public loading = false;
  public errorMessage: string;
  public list: List;
  public userId: string;
  public loadingg: boolean;

  listSubscritpiton: Subscription;
  private partSub: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService,
    private auth: AuthService) { }

  ngOnInit() {
    this.userId = this.auth.userId;

    this.coursesForm = this.formBuilder.group({
      article: [null, Validators.required],
      quantité: [null ,Validators.required],
    });
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.listService.getListById(params.id).then(
          (list: List) => {
            this.loading = false;
            this.list = list;
            console.log(list.userId)
          }
        );
      }
    );

  }

  onSubmit() {
    this.loading = true;
    const article = new Object();


    article.article = this.coursesForm.get('article').value;
    article.qte = this.coursesForm.get('quantité').value;
    article._id = (article.article.toString() + article.qte.toString() + Date.toString())
    article.buy = false;
    this.route.params.subscribe(
      (params: Params) => {
        this.listService.getListById(params.id).then(
          (theList: List) => {
            this.loading = false;
            //modList.courses= list.courses;
            theList.courses.push(article)
            this.modifyAndRecover(theList)
          }
        );

      }
    )
    this.coursesForm.value.qte = 0
  }

  modifyAndRecover(theList: List){
        this.route.params.subscribe(
          (params: Params) => {
        this.listService.modifyThing(params.id, theList).then(
          () => {
            this.route.params.subscribe(
              (params: Params) => {
                this.listService.getListById(params.id).then(
                  (list: List) => {
                    this.loading = false;
                    this.list = list;
                    this.coursesForm.reset()

                  }
                );

              },
              (error) => {
                this.loading = false;
                console.log('Oui')
                this.errorMessage = error.message;
              }
            );
          }
        );
      }
    );
}

  onDeleteItem(id : number) {
    this.route.params.subscribe(
      (params: Params) => {
        this.listService.getListById(params.id).then(
          (theList: List) => {
            this.loading = false;
            theList.courses.splice(id, 1)
            this.modifyAndRecover(theList)
          }
        );
      }
    )
  }

  onGoBack() {
    this.router.navigate(['/lists'])
  }


  StatusChange(id : number) {
    this.route.params.subscribe(
      (params: Params) => {
        this.listService.getListById(params.id).then(
          (list: List) => {
            console.log(list.courses[id].buy)
            list.courses[id].buy = !list.courses[id].buy
            console.log(list.courses[id].buy)
            this.modifyAndRecover(list)
          }
        );
      }
    )
  }

  onDelete() {
    this.loading = true;
    this.listService.deleteList(this.list._id).then(
      () => {
        this.loading = false;
        this.router.navigate(['/lists']);
      }
    );
  }

}
