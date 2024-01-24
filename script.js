let counter = 0;

class BudgetApp{
    get list(){
        console.log("getter");
        return this._list;
    }
    set list(value){
        this._list = value;
        console.log("setter",counter++, this.list)
        this.recalculateBudget()
    }

    constructor(){
        console.log('nieuwe budgetapp');
        this.list = [];
        this.fetchTransactions();
    }
    recalculateBudget(){
        const totalIncome = this.list.length
        ? this.list
            .filter((item)=> !item.expense)
            .reduce((acc, expense)=>(acc += expense.amount),0)
        : 0;

        console.log(totalIncome)
    }

    async fetchTransactions(){
        const response = await fetch(new URL('./transactions.json', import.meta.url))
        if(response.status === 200){
            const data = await response.json();
            this.list = data;
        }
    }


}

new BudgetApp();