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
            c = new Vector(a.size())
            c.rows = a.cols
            c.cols = a.rows

            for(let i=1; i<=c.size(); i++)
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
        this.#isMatrix(a)
        this.#matrixHasSolveCompability(a)

        let c = this.gauss(a).matrix

        for(let j=c.cols-1; j>=2; j--)
        {
            for(let i=j-1; i>=1; i--)
            {
                let k = (-1*c.get(i,j)) / c.get(j,j)
                this.multiplyRowByScalarAndPlusRow(c,j,k,i)
            }
        }

        //Diagonal principal igual a 1
        for(let j=1; j<=c.cols-1; j++)
        {
            this.multiplyRowByScalar(c,j,1/c.get(j,j))
        }

        let vector = new Vector(c.rows)
        for(let i=1; i<=vector.size(); i++)
        {
            vector.set(i, c.get(i, c.cols))
        }
        
        console.log(vector)
        return vector
        
    }

    det(a)
    {
        let c = this.gauss(a)
        let det = c.cof

        for(let i=1; i<=c.matrix.rows; i++)
        {
            det *= c.matrix.get(i,i)
        }

        return det
    }

    gauss(a)
    {
        this.#isMatrix(a)
        this.#matrixHasGaussCompability(a)

        
        let c = 
        {
            matrix: new Matrix(a.rows, a.cols, a.values.slice()),
            cof: 1
        }

        for(let j=1; j<=c.matrix.rows; j++)
        {
            for(let i=j+1; i<=c.matrix.rows;i++)
            {
                if(c.matrix.get(j,j) == 0)
                {
                    for(let k=j+1; k<=c.matrix.rows; i++)
                    {
                        if(c.matrix.get(k,j) != 0)
                        {
                            this.changeRows(c.matrix, j, k)
                            c.cof *= -1
                            break
                        }
                    }
                }
                let k = (-1*c.matrix.get(i,j)) / c.matrix.get(j,j)
                this.multiplyRowByScalarAndPlusRow(c.matrix, j, k, i)
            }
        }

        return c    
    }

    changeRows(a, ri, rj)
    {
        for(let j=1; j<=a.cols; j++)
        {
            let aux = a.get(ri,j)
            a.set(ri, j, a.get(rj,j))
            a.set(rj, j, aux)
        }
    }

    multiplyRowByScalar(a, ri, k)
    {
        for(let j=1; j<=a.cols; j++)
        {
            a.set(ri, j, k*a.get(ri,j))
        }
    }

    multiplyRowByScalarAndPlusRow(a, ri, k, rj)
    {
        for(let j=1; j <= a.cols; j++)
        {
            a.set(rj, j, k * a.get(ri,j) + a.get(rj,j))
        }
    }

    #isMatrix(a)
    {
        if(typeof a != "object" || !(a instanceof Matrix))
        {
            throw "O parametro b deve ser do tipo matriz."
        }
    }

    #matrixHasNullElement(a)
    {
        for(let i=0; i<a.values.length; i++)
        {
            if(a.values[i] == 0)
            {
                throw "A matriz b possui pelo menos um elemento nulo."
            }
        }
    }

    #matrixesHasSameSize(a,b)
    {
        if(a.rows != b.rows || a.cols != b.cols)
        {
            throw "As matrizes passadas como parametro são incompativeis."
        }
    }

    #matrixHasDotCompability(a, b)
    {
        if(a.cols != b.rows)
        {
            throw "As matrizes passados como parâmetro são imcompativeis!"
        }
    }

    #matrixHasSolveCompability(a)
    {
        if(a.cols != a.rows + 1)
        {
            throw "A matriz passada como parametro é incompativel"
        }
    }

    #matrixHasGaussCompability(a)
    {
        if(a.cols < a.rows)
        {
            throw "A matriz passada como parametro é incompativel!"
        }
    }
}