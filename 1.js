document.addEventListener("DOMContentLoaded", () => {
    // Expense elements
    const expenseForm = document.getElementById("expense-form");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseCategory = document.getElementById("expense-category");
    const expenseDate = document.getElementById("expense-date");
    
    // Income elements
    const addIncomeBtn = document.getElementById("add-income");
    const incomeInput = document.getElementById("add-INCOME");
    const incomeCategory = document.getElementById("income-category");
    
    // Table elements
    const transactionBody = document.getElementById("transaction-body");
    const filterCategory = document.getElementById("filter-category");
    const totalAmountSpan = document.getElementById("total-amount");
    
    // Summary elements
    const totalIncomeSpan = document.getElementById("total-income");
    const totalExpenseSpan = document.getElementById("total-expense");
    const balanceSpan = document.getElementById("balance");


    let transactions = [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value);
        const category = expenseCategory.value;
        const date = expenseDate.value;

        if (name === "" || isNaN(amount) || amount <= 0 || category === "" || date === "") {
            alert("Please fill all fields correctly!");
            return;
        }

        transactions.push({
            type: "Expense",
            name: name,
            amount: amount,
            category: category,
            date: date
        });
        expenseForm.reset();
        updateDisplay();
    })
    addIncomeBtn.addEventListener("click", () => {
        const amount = parseFloat(incomeInput.value);
        const category = incomeCategory.value;
         const today = new Date().toISOString().slice(0, 10);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid income amount!");
            return;
        }
        
        transactions.push({
               type: "Income",
            name: category,
            amount: amount,
            category: category,
            date: today
        });

        incomeInput.value = "";
        updateDisplay();
    });

    filterCategory.addEventListener("change", () => {
        updateDisplay();
    });

    
    function updateDisplay() {
        const filterValue = filterCategory.value;
        let filteredTransactions = transactions;

        if (filterValue !== "All") {
            filteredTransactions = transactions.filter(
                item => item.category === filterValue
            );
        }
    
        transactionBody.innerHTML = "";
        
        filteredTransactions.forEach((item) => {
            const row = document.createElement("tr");
            
            const amountColor = item.type === "Income" ? "color: green;" : "color: red;";
            
            row.innerHTML = `
                <td>${item.type}</td>
                <td>${item.name}</td>
                <td style="${amountColor}">₹${item.amount.toFixed(2)}</td>
                <td>${item.category}</td>
                <td>${item.date}</td>
                <td>
                    <button class="delete-btn" onclick="deleteTransaction(${transactions.indexOf(item)})">Delete</button>
                </td>
            `;
            transactionBody.appendChild(row);
        });
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(item => {
            if (item.type === "Income") {
                totalIncome += item.amount;
            } else if (item.type === "Expense") {
                totalExpense += item.amount;
            }
        });

             const balance = totalIncome - totalExpense;
        totalIncomeSpan.textContent = `₹${totalIncome.toFixed(2)}`;
        totalExpenseSpan.textContent = `₹${totalExpense.toFixed(2)}`;
        balanceSpan.textContent = `₹${balance.toFixed(2)}`;
        totalAmountSpan.textContent = balance.toFixed(2);
          if (balance >= 0) {
            balanceSpan.style.color = "green";
        } else {
            balanceSpan.style.color = "red";
        }
    }
    updateDisplay();
});