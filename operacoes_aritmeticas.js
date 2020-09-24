//Essa classe representa as operações elementares com linhas
// de uma matriz. Pag 7 do livro.
class OpAlgebricas
{
    //Operação: troca duas equações (linhas) entre si. Pag 7 do livro.
    //Troca a posicao da linha a com a linha b
    trocaLinha(matriz, a, b)
    {

        var temp
        var newMatriz = new Matrix(matriz.rows, matriz.cols, matriz.values)
        for(var i=1; i<=matriz.cols; i++)
        {
            temp = matriz.get(a,i)
            matriz.set(a,i,matriz.get(b,i)) 
            matriz.set(b,i, temp)
        }

    }

    //Operação: multiplicar uma equação (linha) inteira por uma constante não nula.
    //dividir os elementos da linha a pelo elemento matriz.get(a,b)
    dividirLinha(matriz, a, b)
    {
        for(var i=b+1; i<=matriz.cols; i++)
        {
            matriz.set(a,i, matriz.get(a,i)*(1/matriz.get(a,b)));
        }
        matriz.set(a,b, 1);
    }

    //Somar uma constante vezes uma equação (linha) a uma outra equação (linha).
    //"a" é a primeira linha da matriz (ou submatriz) corrente. "b" é a coluna do pivô
    somarConstante(matriz, a ,b)
    {
        for(var p=2; p<=matriz.rows; p++)
        {
            if(p!=a && matriz.get(a, b) != 0)
            {
                for(var q=(b+1); q<=matriz.cols; q++)
                {
                    var temp = matriz.get(p,q);
                    matriz.set(p,q, temp + (matriz.get(p,b)*( - matriz.get(a,q))));

                }
                matriz.set(p,b,0);
            }
        }
    }
}