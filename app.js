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
                //fileContents.innerText = ' ';

                var first = 1
                var tempValue = ''
                var indices = []
                var index = 0
                for(var i=0; i<a.length-1; i++)
                {
                    if(!(a[i].startsWith('%')))
                    {
                        if(first == 1)
                        {
                            var b = a[i].split('')

                            for(var g=0; g<b.length; g++)
                            {
                                if(b[g] != ' ')
                                {
                                    tempValue+=b[g]
                                }else
                                {
                                    indices[index] = parseInt(tempValue)
                                    index++
                                    tempValue = ''
                                }
                            }
                            matrizIn = new Matrix(indices[0], indices[1])
                            first = 0
                            index = 0
                            //console.log("indice 0: umavez " + indices[0])
                            //console.log("indice 1: umavez" + indices[1])
                        }else
                        {

                            var b = a[i].split('')
                            //fileContents.append(a[i])
                            //fileContents.innerHTML+="<br>"
                            tempValue=''
    
                            for(var g=0; g<b.length; g++)
                            {
                                if(b[g] != ' ')
                                {
                                    //console.log(b[g])
                                    tempValue+=b[g]
                                    
                                }else
                                {
                                    indices[index] = parseInt(tempValue)
                                    //onsole.log("index: " + index)
                                    index++
                                    tempValue = ''
                                }
                            }
                            indices[index] = parseInt(tempValue)
                            //onsole.log("index: " + index)
                            tempValue = ''
                            index=0
                            //console.log("indice 0: " + indices[0])
                            //console.log("indice 1: " + indices[1])
                            //console.log("indice 2: " + indices[2])
                            matrizIn.set(indices[0],indices[1], indices[2])
                        }
 
                    }
            }
            }
            fileReader.readAsText(fileTobeRead);
            console.log("Arquivo lido!")
            return matrizIn
            
        }, false);
        


}