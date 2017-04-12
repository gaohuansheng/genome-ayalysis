/**
 * Created by hsgao on 17-3-29.
 */

function find_zero(list){
    if (arguments === 0){
        console.log("no arguments")
    }
    else if(arguments === 1 && typeof(arguments[0]) === 'list'){
        for (var i of list){
            if (i===0){
                return "0"
            }
        }
    }
}

find_zero();
