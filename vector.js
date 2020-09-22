class Vector
{
    
    constructor(dim, values)
    {
        this.dim = dim;
        
        if(values == undefined)
        {
            this.values = [];
            for(var i=0; i<dim; i++)
            {
                this.values.push(0);
            }
        }else
        {
            if(values.length == this.dim)
            {
                this.values = values;
            }else
            {
                throw "O array de valores é incompativel com a dimensão fornecida."
            }
        }
    }

    get(i)
    {
        return this.values[this.getIndex(i)];
    }

    set(i, value)
    {
        this.values[this.getIndex(i)] = value
    }

    getIndex(i)
    {
        if(i <1 || i>this.dim) throw "O indice da linha esta fora da dimensão do vetor."

        return (i - 1);
    }
}