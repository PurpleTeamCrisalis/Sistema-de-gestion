export class Item 
{
    constructor(id, name, description, price)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

export class Product extends Item
{
    constructor(quantiy, warranty, id, name, description, price)
    {
        super(id, name, description, price);
        this. quantiy = quantiy;
        this.warranty = warranty;
    }
}

export class Service extends Item
{
    constructor(id, name, description, price)
    {
        super(id, name, description, price);
    }
}

export class Client 
{
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
    }
}

export class Order 
{
    constructor(client, products=[], services=[], id=null)
    {
        this.client = client;
        if(client == null)
            this.client = new Client(0,"Seleccione un cliente");
        this.products = products;
        this.services = services;
        this.id = id;
    }

    clientName()
    {
        return this.client.name;
    }
}