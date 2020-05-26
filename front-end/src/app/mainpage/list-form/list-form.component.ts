import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ListService} from "../../services/list.service";
import {List} from "../../models/list.model";
import {Object} from "../../models/object.model";

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  public listForm: FormGroup;
  public loading = false;
  public errorMessage: string;
  public userId: string;

  constructor(private formBuilder: FormBuilder,
              private listService: ListService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.listForm = this.formBuilder.group({
      titre: [null, Validators.required],
    });
  }

  onGoBack() {
    this.router.navigate(['/lists'])
  }

  onSubmit() {
    this.loading = true;
    const list = new List();
    list.titre = this.listForm.get('titre').value;
    list.courses = new Array<Object>()
    list.userId = this.auth.userId;
    this.listService.createNewList(list).then(
      () => {
        this.listForm.reset();
        this.loading = false;
        this.router.navigate(['/lists']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
