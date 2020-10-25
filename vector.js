class Vector extends Matrix
{
    
    constructor(dim, values)
    {
        super(dim,1,values)
    }

    get(i)
    {
        if(this.rows >= this.cols)
        {
            return super.get(i,1);
        }else
        {
            return super.get(1, i)
        }
        return this.values[this.getIndex(i)];
    }

    set(i, value)
    {
        if(this.rows >= this.cols)
        {
            super.set(i,1,value)
        }else
        {
            super.set(1,i,value)
        }
    }

    size()
    {
        return Math.max(this.rows, this.cols)
    }
}