import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  entries: Array<number> = [];

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    document.querySelector('form')?.addEventListener('submit', this.handleFormSubmit);
  }

  summer(total: any, currentval: any) {
    return total + currentval;
  }

  calcTotal() {
    let sum = this.entries.reduce(this.summer).toString();
    document.getElementById("total")!.innerHTML = sum;
    document.querySelector("#progressTotal")!.innerHTML = sum;
  }

  heigestVal() {
    let max = Math.max(...this.entries);
    document.querySelector("#height")!.innerHTML = max.toString();
  }

  calcAverage() {
    document.querySelector("#average")!.innerHTML = String((this.entries.reduce(this.summer) / this.entries.length).toFixed(1));
  }

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    let element = document.querySelector('#miles') as HTMLInputElement;
    this.InList(element.value);
    this.entries.push(Number(element.value));

    let call = new Promise((resolve, reject) => {
      return resolve(this.calcTotal());
    });

    call.then((data: any) => {
      this.calcAverage();
      this.heigestVal();
    });

    let form = document.getElementsByTagName('form')[0] as HTMLFormElement;
    form.reset();
  }

  InList(val: any) {
    let list = document.querySelector('#entries') as HTMLUListElement;
    let liItem = document.createElement('li') as HTMLLIElement;
    liItem.appendChild(document.createTextNode(val));
    list.appendChild(liItem);
    list.removeChild(list.firstElementChild as HTMLLIElement);
  }

}
