import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor(private renderer:Renderer2){

  }

  ngOnInit(): void {
    document.querySelector('form')?.addEventListener('submit', this.handleFormSubmit);
  }

  handleFormSubmit = (event: any)=>{
    event.preventDefault();
    let element = document.querySelector('#miles') as HTMLInputElement;
    this.InList(element.value);
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
