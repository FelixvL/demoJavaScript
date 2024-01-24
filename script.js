let counter = 0;

const elMap = {
    budget : document.querySelector('.budget'),
}

class BudgetApp{
    get list(){
        console.log("getter");
        return this._list;
    }
    set list(value){
        this._list = value;
        console.log("setter",counter++, this.list)
        this.recalculateBudget()
        this.render()
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
        const totalExpenses = this.list.length
        ? this.list
            .filter((item)=> item.expense)
            .reduce((acc, expense)=>(acc += expense.amount),0)
        : 0;

        console.log(totalIncome)

        this.budgetLeft = totalIncome - totalExpenses

        console.log(this.budgetLeft)
        const percentageLeft = Math.max((100/totalIncome) * this.budgetLeft,0);
        const barWith = Math.max((400/100) * percentageLeft,0);

        console.log(percentageLeft);
        console.log(barWith);
    }
    render(){
        elMap.budget.innerText = new Intl.NumberFormat('nl-NL',{
            style:'currency',
            currency:'EUR'
        }).format(this.budgetLeft);
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