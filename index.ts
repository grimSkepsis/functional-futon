import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';

var curriedMapReducer =
    curry( function mapReducer(mapperFn,combinerFn){
        return function reducer(list,val){
            return combinerFn( list, mapperFn( val ) );
        };
    } );

var curriedFilterReducer =
    curry( function filterReducer(predicateFn,combinerFn){
        return function reducer(list,val){
            if (predicateFn( val )) return combinerFn( list, val );
            return list;
        };
    } );



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

//https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#some-now-some-later
function curry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){
        return function curried(nextArg){
            var args = [ ...prevArgs, nextArg ];

            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}

//https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch4.md/#chapter-4-composing-functions
function compose(...fns) {
    return function composed(result){
        return [...fns].reverse().reduce( function reducer(result,fn){
            return fn( result );
        }, result );
    };
}