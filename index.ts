import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';


const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);

source.subscribe(x => console.log(x));





function mapReducer(mapperFn: (val: any) => any, combinerFn: (list: Array<any>, val: any) => Array<any>): any {
  return function reducer(list, val){
    return combinerFn(list, mapperFn(val));
  };
}

function filterReducer(predicateFn: (val: any) => boolean, combinerFn: (list: Array<any>, val: any) => Array<any>): any {
  return function reducer(list, val){
   return predicateFn(val) ? combinerFn(list, val): list;
  };
}

function listCombine(list: Array<any>, val: any): Array<any> {
   list.push(val);
   return list;
}