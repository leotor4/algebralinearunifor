class Gauss
{
    //troca a posicao da linha a com a linha b
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

    //dividir os elementosda linha i pelo elemento matriz.get(a,b)
    dividir(matriz, a, b)
    {
        for(var i=b+1; i<=matriz.cols; i++)
        {
            matriz.set(a,i, matriz.get(a,i)/matriz.get(a,b));
        }
        matriz.set(a,b, 1);
    }
}