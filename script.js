let counter = 0;

const elMap = {
    budget : document.querySelector('.budget'),
    form : document.getElementById('transaction-form'),
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
        elMap.form.addEventListener('submit',this.submitForm.bind(this))
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

        const stylesheet = document.styleSheets[0];
        const rule = [...stylesheet.cssRules].find((r)=> r.selectorText === ':root');
        rule.style.setProperty('--bar-width',`${barWith}px`)
        rule.style.setProperty('--bar-color',`hsl(${percentageLeft}, 50%, 70%`)
        rule.style.setProperty('--bar-color-fill',`hsl(${percentageLeft}, 50%, 50%`)


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
    submitForm(ev) {
        ev.preventDefault();
        const formElems = ev.target.elements;
        const amount = parseFloat(formElems['amount'].value);
        const name = formElems['name'].value;
        const expense = formElems['input-type-expense'].checked;
        if (!amount || !name) {
          return;
        }
        this.list = [{ amount, name, expense }, ...this.list];
      }


}

new BudgetApp();