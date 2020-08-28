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

    // operacao "multiplicacao escalar matriz"
    // multiplica um valor escalar por todos os elementos da matriz
    scalarmult(k, a)
    {
        let c = new Matrix(a.rows, a.cols);

        for(let i = 1; i <= c.rows; i++)
        {
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, a.get(i, j) * k);
            }
        }

        return c;
    }

    //opercao "multiplicacao elemento a elemento"
    // multiplica os elementos de uma matriz a pelos elementos de uma matriz b
    // num de linha e de coluna de matriz A deve ser igual a de B
    times(a,b)
    {

        if(a.rows != b.rows || a.cols != b.cols) throw "As matrizes são incompativeis."

        let c = new Matrix(a.rows, a.cols);

        for(let i = 1; i <= c.rows; i++)
        {
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, a.get(i, j) * b.get(i, j));
            }
        }

        return c;
    }
}