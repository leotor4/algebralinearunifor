// classe que contem todas as funcoes de algebra linear
class LinearAlgebra{

    //representa a funcao transposicao de matriz
    /*a transposicao recebe uma matriz mxn
    e gerar uma matriz resultante nxm.
    */
    transpose(a)
    {
        let c

        if(a instanceof Vector)
        {
            c = new Vector(a.size)
            c.rows = a.cols
            c.cols = a.rows

            for(let i=1; i<=c.size; i++)
            {
                c.set(i, a.get(i))
            }
        }else if(typeof a == "object" && a instanceof Matrix)
        {
            c = new Matrix(a.cols, a.rows);

            for(let j = 1; j <= c.cols; j++)
            {
                for(let i = 1; i <= c.rows; i++)
                {
                    c.set(i, j, a.get(j, i));
                }
            }
        }else
        {
            throw "O parâmetro não é uma matriz."
        }

        return c;

    }

    //operação de adição. Adiciona uma valor escalar a cada elemento
    // recebe duas matrizes MxN e retorna uma matriz NxM
    plus(a, b)
    {
        if((typeof a != "object" || !(a instanceof Matrix)) || (typeof b != "object" || !(b instanceof Matrix)))
            throw "Parâmetro não é do tipo Matriz"
        
            if(a.rows != b.rows || a.cols != b.cols) throw "As matrizes são incompativeis."

            let c = new Matrix(a.rows, a.cols);
    
            for(let i = 1; i <= c.rows; i++)
            {
                for(let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, a.get(i, j) + b.get(i, j));
                }
            }
    
            return c;

    }

    
    times(a,b)
    {
        if((typeof a == "object" && a instanceof Matrix) && (typeof b == "object" && b instanceof Matrix))
        {
            if(a.rows != b.rows || a.cols != b.cols) throw "As matrizes são incompativeis."
            var c = new Matrix(a.rows, a.cols);
            for(let i = 1; i <= c.rows; i++)
            {
                for(let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, a.get(i, j) * b.get(i, j));
                }
            }
        }else
        {
            throw "O parametro a deve ser composto de matrizes."
        }

        

        return c;
    }

    // divisao elemento a elemento. Divide o elemento aij pelo elemento bij. Retorna uma matriz resultante.
    //recebe uma matriz a e uma matriz b
    div(a,b)
    {
        //verifica se a e b sao matrizes
        if(typeof b != "object" || !(b instanceof Matrix) || typeof a != "object" || !(a instanceof Matrix))
        {
            throw "O parametro b deve ser uma matrix."
        }


        //verifica se as matrizes sao do mesmo tamanho
        if(a.rows != b.rows || a.cols != b.cols) 
            throw "As matrizes são incompativeis."
        
        //verifica se a matriz b possui algum elemento nulo
        for(let i=0; i<b.values.length; i++)
        {
            if(b.values[i] == 0)
            {
                throw "A matriz b possui pelo menos um elemento nulo"
            }
        }

        let c = new Matrix(a.rows, a.cols);

        for(let i = 1; i <= c.rows; i++)
        {
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, a.get(i, j) / b.get(i, j));
            }
        }

        return c;
    }    

    //funcao multiplicacao de matriz ou matriz x matriz
    dot(a,b)
    {
        if(typeof b != "object" || !(b instanceof Matrix) || (typeof a != "object" || !(a instanceof Matrix)))
        {
            throw "O parametro b deve ser uma matrix."
        }

        if(a.cols != b.rows)
            throw "matrizes incompativeis. Num de colunas de A diferente do num de linhas  de B"

        let c = new Matrix(a.rows,b.cols)

        for(var i=1; i<= a.rows; i++)
        {
            for(var j=1; j<=b.cols; j++)
            {
                for(var k=1; k<=a.cols; k++)
                {
                    c.set(i, j, c.get(i,j) + a.get(i,k)*b.get(k,j))
                }
            }
        }

        return c
    }

    //algoritmo de gauss-jordan
    solve(a)
    {
        var vetor = new Vector(matrizIn.rows)
		var elementar = new OpElementares
        var d = new Date();
        var inicio
        var fim
        var i = 1
        var j = 1

        inicio = d.getTime()
        //eliminação gaussiana
        while(i <= a.rows && j <= a.cols)
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

        var s = a.rows

        j = 1
        //Gauss-jordan
        while(s>1)
        {
            var y = 1;
            var pivo
            var pivoIndexCol = 0
            var naoNulo = 0
            while(y<a.cols)
            {
                
                if(a.get(s,y) == 1)
                {
                    naoNulo = 1;
                    pivoIndexCol = y;
                    break;
                }
                y++;
            }

            if(naoNulo == 1)
            {
                var k = s - 1

                for(var h=0; h<s-1; h++)
                {

                    if(a.get(k,pivoIndexCol) != 0)
                    {
                        
                        elementar.somaConstanteInversa(a,s,k,a.get(k,pivoIndexCol))

                    }
                    k--
                }
                 
            }
            s--
        }
        d = new Date();
        fim = d.getTime()
        
        var colCorrente = a.cols
        for(var w=1; w<=a.rows; w++)
        {
            vetor.set(w, a.get(w,a.cols))
        }
        console.log("Temp de execução: " + (fim - inicio))
        console.log(vetor)
        return vetor
    }
}