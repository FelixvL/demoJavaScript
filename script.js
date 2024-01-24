class BudgetApp{
    get list(){
        console.log("getter");
        return this._list;
    }
    set list(value){
        console.log("setter")
        this._list = value;
    }

    constructor(){
        console.log("nieuwe budgetapp");
        this.list = [];
        console.log("onze lijst", this.list);
    }


}

new BudgetApp();