import {Component, OnInit, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-popin-validation',
  templateUrl: './popin-validation.component.html',
  styleUrls: ['./popin-validation.component.scss']
})
export class PopinValidationComponent implements OnInit {

  @Output() onDecision: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit() { }

  cancel() {
    this.onDecision.emit(false);
  }

  preventCancel(e: Event) {
    e.preventDefault();
  }

  validate() {
    this.onDecision.emit(true);
  }

}
