import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alaska - Card Reader Tool';
  result: string = "";
  coordenates: string = "";
  data: any = [];
  items: any = [[], [], [], [], [], [], [], [], [], [], [], []];
  displayCard: boolean;
  cardText: any = "Show Card";

  constructor(public http: Http) {

    http.get("assets/card.json").subscribe(res => {
      this.data = res.json();
      this.items = this.data["items"];
    });
  }
  getValueFromCard(letter, number) {
    let result;
    for (let i = 0; i <= 12; i++) {
      if (this.items[0][i] == letter) {
        result = this.items[number][i];
      }
    }
    return result;
  }

  checkJson() {
    if (this.items == undefined) {
      this.result = "Add your card coordantes on assets/card.json";
      return false;
    }

    if (this.items.length < 8) {
      this.result = "Coordenates missing on assets/card.json you need to complete the card";
      return false;
    }
    return true;
  }

  checkCoordenates() {

    return true;
  }
  getKeys() {
    if (!this.checkJson())
      return;
    let text = "[A3] [A5] [A7]"
    let key = this.coordenates.toUpperCase().replace(/\[/g, "").replace(/\]/g, "").replace(/\ /g, ""); 
    if (key == "")
      return;

    else if (key.length < 6) {
      this.result = "Some coordinates are missing";
    }
    else if (key.length == 6) {

      let firstLetter = key.substring(0, 1);
      let firstNumber = key.substring(1, 2);

      let secondLetter = key.substring(2, 3);
      let secondNumber = key.substring(3, 4);

      let thirdLetter = key.substring(4, 5);
      let thirdNumber = key.substring(5, 6);

      if (isNaN(parseInt(firstNumber)) || isNaN(parseInt(secondNumber)) || isNaN(parseInt((thirdNumber)))) {
        this.result = "Numbers are missing in coordenates";
      }
      else if ((this.invalidNumber(firstNumber)) || this.invalidNumber(secondNumber) || this.invalidNumber(thirdNumber)) {
        this.result = "Set number coordenates between 1 and 7";
      }
      else {
        var resultFromGrid = "Result: " + this.getValueFromCard(firstLetter, firstNumber) + this.getValueFromCard(secondLetter, secondNumber) + this.getValueFromCard(thirdLetter, thirdNumber);
        this.result = resultFromGrid.includes("undefined") ? "Check coordantes have the format A1B1C1. Letters between A-L. Numbers between 1-7." : resultFromGrid;

      };
    };

  }

  invalidNumber(value) {
    return 1 > value || value > 7;
  }

  showCard() {
    if (this.displayCard) {
      this.displayCard = false;
      this.cardText = "Show Card";
    }
    else {
      this.displayCard = true;
      this.cardText = "Hide Card";

    }

  }

}
