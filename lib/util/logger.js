
/* The purpose of this file is to display extra information 
for debugging or educational purpose  */
function logger(message,displayTable=false,matrix=null) {
    if (displayTable){
        console.log(message)
        // for displaying tables(matrixes in tables)
        console.table(matrix)
    }else {
        console.log(message)
        // console.log(displayTable)
    }
}
