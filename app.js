var matrizIn 
window.onload = function () {

    //Check the support for the File API support

        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {


            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match

            //Initialize the FileReader object to read the 2file
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                var fileContents = document.getElementById('filecontents');
                fileContents.innerText = ' '

                var a = fileReader.result.split('\n')
                fileContents.innerText = ' ';

                var first = 1

                for(var i=0; i<a.length-1; i++)
                {
                    if(!(a[i].startsWith('%')))
                    {
                        if(first == 1)
                        {
                            var b = a[i].split('')
                            matrizIn = new Matrix(parseInt(b[0]), parseInt(b[2]))
                            first = 0
                        }else
                        {
                            var b = a[i].split('')
                            fileContents.append(a[i])
                            fileContents.innerHTML+="<br>"
                            var tempValue=''
    
                            for(let j=4; j<b.length; j++)
                            {
                                tempValue+= b[j]
                            }
                        
                            matrizIn.set(parseInt(b[0]),parseInt(b[2]), parseInt(tempValue))
                        }
 
                    }
            }
            }
            fileReader.readAsText(fileTobeRead);
            return matrizIn

        }, false);



}