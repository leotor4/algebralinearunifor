var elementar = new OpElementares
class Gauss
{

    solve(a)
    {
        var i = 1
        var j = 1
        while(i < a.rows && j < a.cols)
        {
            //procurar por um numero não nulo na coluna j ou abaixo da linha i
            var k = i 

            while(k <= a.rows && a.get(k,j) == 0)   k++

            //se k sair do while como menor que o num de linhas eh pq tem umm elemento n nulo na coluna j
            if(k<=a.rows)
            {
                // se k não for a primeira linha, então trocar a linha k com a primeira linha
                if(k!=i)
                {
                    elementar.trocaLinha(a, i, k)
                }

                if(a.get(i,j) != 1)
                {
                    elementar.dividirLinha(a,i,j)
                }

                elementar.somarConstante(a,i,j)
                i++
            }
            j++;
        }
        

        var pivoIndex
        var pivo
        var temPivo=0
        var passou = 0
        for(var z=a.rows;z>1;z--)
        {
            console.log("leo")
        for(var y=1; y<=6;y++)
            {
                console.log("laise")
                if(a.get(z,y) != 0 && passou ==0)
                {

                    
                    temPivo = 1;
                    pivo = a.get(z,y);
                    pivoIndex = y;     
                    passou =1;
                }
            }
   

            if(temPivo == 1){
                temPivo=0;
                if(pivo != 1){
                    a.set(z,pivoIndex,1)
                   
                    //A[z][pivoIndex] = 1;
                    for(var y=pivoIndex+1; y<=6;y++)
                    {
                        a.set(z,y, a.get(z,y) * (1/pivo))
                        //A[z][y] = A[z][y] * (1/pivo);
                    }
                }
                
                for(var t=z-1; t>=1;t--)
                {
                    
                    var j=1;
                    var mult = -a.get(t,pivoIndex) //-A[t][pivoIndex];
                    while(j<=6)
                    {
                        a.set(t,j, a.get(z,j) * mult + a.get(t,j))
                        
                    	//A[t][j] = A[z][j] * mult + A[t][j];
                        j++;
                    }
                }

            }
            passou = 0;
        }








        // i = a.rows
        // j = 1
        // var pivoIndex
        // var pivo
        // var temPivo=0
        // var cheirou = 0
        // var passou = 0
        // for(var z=a.rows;z>1;z--)
        // {
            
        //     //percorrer as colunas para encontrar o pivô
        //     for(var y=1; y<6;y++)
        //     {
                
        //         if(a.get(z,y) != 0 && passou ==0)
        //         {
        //             temPivo = 1
        //             pivo = a.get(z,y)
        //             pivoIndex = y
        //             console.log("Coluna pivo: " + pivoIndex)
                    
        //         }
        //     }
   

        //     if(temPivo == 1)
        //     {
        //         temPivo=0
        //         if(pivo != 1 && cheirou==0)
        //         {
        //             console.log("quantas  vezes")
        //             a.set(z,pivoIndex,1)
        //             for(var y=pivoIndex+1; y<=6;y++)
        //             {
        //                 a.set(z,y,a.get(z,y)*(1/pivo))
        //             }
        //             cheirou == 1
        //         }
                
        //         var j=1
        //         console.log("multiplicador: " + -a.get(z-1,pivoIndex))
        //         while(j<=6)
        //         {
                    
        //             a.set(z-1,j, a.get(z-1,j) * (-a.get(z-1,pivoIndex)))
        //             j++
        //         }
        //     }
        //     passou == 1
        // }




        // i= a.rows
        // j=a.cols

        // while(i>1 && j>1)
        // {
        //     var k = i

        //     while(k >= 1 && a.get(k,j) == 0)   k--
        
        //     if(k>=1)
        //     {
        //         elementar.somarConstante(a,i,j)
        //         i--
        //     }

        // }
        // j--
        //r//eturn a
    }
}