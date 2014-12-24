module IonicTypescriptBootstrap {

    export class Product {

        public Id: string;
        public Name: string;
        public Price: number;

        constructor(id: string, name: string, price: number) {
            this.Id = id;
            this.Name = name;
            this.Price = price;
        }
    }
}
