import { useContext } from "react";
import { Context } from "../context";
import "../styles/Expense.css";


function Expense({expense}) {
    const {login} = useContext(Context);
    const firstPart = (expense) => {
        if (expense.author.login == login) {
            return (
                <div className="price">
                    <span className="price_text">Вы заплатили</span>
                    <span className="price_price">{expense.count + 'p'}</span>
                </div>
            );
        } else {
            return (
                <div className="price">
                    <span className="price_text">{expense.author.name + ' ' + expense.author.surname  + ' заплатил:'}</span>
                    <span className="price_price">{expense.count + 'p'}</span>
                </div>
            );
        }
    }
    const secondPart = (expense) => {
        const debt = (expense.count / (expense.debtors.length));
        if (expense.author.login == login) {
            return (
                <div className="price">
                    <span className="price_text">Вам вернут</span>
                    <span className="price_price">{(expense.count - debt).toFixed(2) + 'p'}</span>
                </div>
            );
        } else {
            return (
                <div className="price">
                    <span className="price_text">Вы должны</span>
                    <span className="price_price">{expense.count + ' p'}</span>
                </div>
            );
        }
    }
    return (
        <div className="exp_items">
            <div className="main_block">
                <div className="expense_date">
                    <span className="month">{expense.date.month.toUpperCase()}</span>
                    <span className="day">{expense.date.day}</span>
                </div>
                <img src="/bill.png" alt=""></img>
                <div className="expense_name">
                    <div>{expense.description}</div>
                </div>
            </div>
            {firstPart(expense)}
            {secondPart(expense)}
         </div>
    );
}

export default Expense;