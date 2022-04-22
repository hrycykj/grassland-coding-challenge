import { Component, OnInit } from '@angular/core';
import {FruitTableViewModel} from './fruit-table-view-model';

@Component({
  selector: 'app-fruit-table',
  templateUrl: './fruit-table.component.html',
  styleUrls: ['./fruit-table.component.scss'],
  providers: [FruitTableViewModel]
})
export class FruitTableComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'genus', 'calories', 'carbohydrates', 'sugar'];

  constructor(public viewModel: FruitTableViewModel) {

  }
  dataSource = this.viewModel.fruitData$
  filteredDataSource = this.dataSource.value||this.dataSource

  fruitFilter(event: Event) {
    console.log('event', event)
    const filterBy = (event.target as HTMLInputElement).value.toLowerCase();
    const dataTable = this.dataSource.value
    let resultTable = []
    console.log('filter term:',filterBy)
    console.log('local dataTable',dataTable)
    console.log('filteredData',this.filteredDataSource)
    dataTable.forEach((fruitInfo) => {
      // console.log ('for each:',fruitInfo)
      if  (fruitInfo.genus.toLowerCase().includes(filterBy)
          ||fruitInfo.name.toLowerCase().includes(filterBy)
          ||fruitInfo.family.toLowerCase().includes(filterBy)
          ||fruitInfo.order.toLowerCase().includes(filterBy)) {
            resultTable.push(fruitInfo)
      }
      this.filteredDataSource=resultTable
    })
    console.log('filtered results',resultTable)
  }

  fruitSort (event: Event) {
    const sortBy = (event.target as HTMLInputElement).value
    console.log('sort fruits by:', sortBy)
    let dataTable = this.dataSource
    let resultTable = []
    console.log('input data for sorting:',dataTable)
    switch (sortBy) {
      case "nameAscending":
        console.log('sort by name, ascending');
        dataTable.value.sort(function(a, b){
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
        dataTable.value.forEach ((fruitInfo) => {
          resultTable.push(fruitInfo)
        })
        break;
      case "nameDescending":
        console.log('sort by name, descending');
        dataTable.value.sort(function(a, b){
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
        dataTable.value.forEach ((fruitInfo) => {
          resultTable.push(fruitInfo)
        })
        resultTable.reverse()
        break;
      case "carbsAscending":
        console.log('sort by carbs, ascending');
        dataTable.value.sort(function(a, b){
          let x = a.nutritions.carbohydrates;
          let y = b.nutritions.carbohydrates;
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
        dataTable.value.forEach ((fruitInfo) => {
          resultTable.push(fruitInfo)
        })
        break;
      case "carbsDescending":
        console.log('sort by carbs, descending');
        dataTable.value.sort(function(a, b){
          let x = a.nutritions.carbohydrates;
          let y = b.nutritions.carbohydrates;
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
        dataTable.value.forEach ((fruitInfo) => {
          resultTable.push(fruitInfo)
        })
        resultTable.reverse()
        break;
      default:
        console.log('no matches');
        dataTable.value.forEach ((fruitInfo) => {
          resultTable.push(fruitInfo)
        })
    }
    console.log ('sorted data:',resultTable)
    this.filteredDataSource=resultTable
    // figure out how to call fruitFilter() in case a filter is in place
  }

  ngOnInit(): void {
  }
}
