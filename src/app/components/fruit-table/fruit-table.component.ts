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
  filteredDataSource = this.dataSource.value

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

  ngOnInit(): void {
  }
}
