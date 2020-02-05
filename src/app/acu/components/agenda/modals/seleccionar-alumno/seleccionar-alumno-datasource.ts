import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: AlumnoItem[] = [
  {
    aluId: 1,
    aluNro: 1,
    aluNom: 'Hydrogen',
    aluApe1: 'apellido prueba',
    aluFchNac: new Date(),
    aluCI: 47033680,
    aluDir: 'Libertador 1532'
  },
  {
    aluId: 2,
    aluNro: 2,
    aluNom: 'Helium',
    aluApe1: 'apellido prueba',
    aluFchNac: new Date(),
    aluCI: 47033680,
    aluDir: 'Libertador 1532'
  },
  {
    aluId: 3,
    aluNro: 3,
    aluNom: 'Lithium',
    aluApe1: 'apellido prueba',
    aluFchNac: new Date(),
    aluCI: 47033680,
    aluDir: 'Libertador 1532'
  },
  {
    aluId: 4,
    aluNro: 4,
    aluNom: 'Beryllium',
    aluApe1: 'apellido prueba',
    aluFchNac: new Date(),
    aluCI: 47033680,
    aluDir: 'Libertador 1532'
  },
  {
    aluId: 5,
    aluNro: 5,
    aluNom: 'Boron', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 6,
    aluNro: 6,
    aluNom: 'Carbon', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 7,
    aluNro: 7,
    aluNom: 'Nitrogen', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 8,
    aluNro: 8,
    aluNom: 'Oxygen', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 9,
    aluNro: 9,
    aluNom: 'Fluorine', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 10,
    aluNro: 10,
    aluNom: 'Neon', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 11,
    aluNro: 11,
    aluNom: 'Sodium', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 12,
    aluNro: 12,
    aluNom: 'Magnesium', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 13,
    aluNro: 13,
    aluNom: 'Aluminum', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 14,
    aluNro: 14,
    aluNom: 'Silicon', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 15,
    aluNro: 15,
    aluNom: 'Phosphorus', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 16,
    aluNro: 16,
    aluNom: 'Sulfur', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 17,
    aluNro: 17,
    aluNom: 'Chlorine', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 18,
    aluNro: 18,
    aluNom: 'Argon', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 19,
    aluNro: 19,
    aluNom: 'Potassium', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
  {
    aluId: 20,
    aluNro: 20,
    aluNom: 'Calcium', aluApe1: 'apellido prueba', aluFchNac: new Date(), aluCI: 47033680, aluDir: 'Libertador 1532'
  },
];

/**
 * Data source for the SeleccionarAlumno view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SeleccionarAlumnoDataSource extends DataSource<AlumnoItem> {
  data: AlumnoItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AlumnoItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AlumnoItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AlumnoItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'aluId': return compare(+a.aluId, +b.aluId, isAsc);
        case 'aluNro': return compare(a.aluNro, b.aluNro, isAsc);
        case 'aluNom': return compare(+a.aluNom, +b.aluNom, isAsc);
        case 'aluApe1': return compare(a.aluApe1, b.aluApe1, isAsc);
        case 'aluFchNac': return compare(+a.aluFchNac, +b.aluFchNac, isAsc);
        case 'aluCI': return compare(+a.aluCI, +b.aluCI, isAsc);
        case 'aluDir': return compare(+a.aluDir, +b.aluDir, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


// TODO: Replace this with your own data model type
export interface AlumnoItem {
  aluId: number;
  aluNro: number;
  aluNom: string;
  aluApe1: string;
  aluFchNac: Date;
  aluCI: number;
  aluDir: string;


}