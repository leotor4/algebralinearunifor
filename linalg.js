// classe que contem todas as funcoes de algebra linear
class LinearAlgebra{

    //representa a funcao transposicao de matriz
    /*a transposicao recebe uma matriz mxn
    e gerar uma matriz resultante nxm.
    */
    transpose(a)
    {
        let c = new Matrix(a.cols, a.rows);

        for(let i = 1; i <= c.rows; i++)
        {
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, a.get(j, i));
            }
        }

        return c;
    }

    //operação de adição. Adiciona uma valor escalar a cada elemento
    // recebe duas matrizes MxN e retorna uma matriz NxM
    plus(a, b)
    {
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

    
    scalarmult(k, a)
    {
        let c = new Matrix(a.rows, a.cols);

        

        return c;
    }

    
    times(a,b)
    {
        // se for igual a number, eu faco a operacao escalar matriz
        if(typeof a == "number")
        {

            if(typeof b != "object" || !(b instanceof Matrix))
            {
                throw "O parametro b deve ser uma matrix."
            }
            // operacao "multiplicacao escalar matriz"
            // multiplica um valor escalar por todos os elementos da matriz
            let c = new Matrix(a.rows, a.cols);

            for(let i = 1; i <= c.rows; i++)
            {
                for(let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, a.get(i, j) * k);
                }
            }

            //opercao "multiplicacao elemento a elemento"
    // multiplica os elementos de uma matriz a pelos elementos de uma matriz b
    // num de linha e de coluna de matriz A deve ser igual a de B
        }else if(typeof a == "object" && a instanceof Matrix)
        {
            if(a.rows != b.rows || a.cols != b.cols) throw "As matrizes são incompativeis."

            for(let i = 1; i <= c.rows; i++)
            {
                for(let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, a.get(i, j) * b.get(i, j));
                }
            }
        }else
        {
            throw "O parametro a deve ser um escalar numerico ou uma matriz."
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

        let c = new Matrix(a.cols, a.rows);

        for(let i = 1; i <= c.rows; i++)
        {
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, a.get(j, i) / b.get(i, j));
            }
        }

        return c;
    }    

    //funcao multiplicacao de matriz ou matriz x matriz
    dot(a,b)
    {
        if(a.cols != b.rows)
            throw "matrizes incompativeis. Num de colunas de A diferente do num de linhas  de B"

        let c = new Matrix(a.cols,b.rows)

        for(var i=1; i<= a.rows; i++)
        {
            for(var j=1; j<=b.cols; j++)
            {
                for(var k=1; k<=a.rows; k++)
                {
                    c.set(i, j, c.get(i,j) + a.get(i,k)*b.get(k,j))
                }
            }
        }

        return c
    }
}