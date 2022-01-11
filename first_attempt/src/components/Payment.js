import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import "../styles/Content.css";
import "../styles/Expense.css";

function Payment({payment}) {
    const {isLogin} = useContext(Context);
    const {login} = useContext(Context);
    if (!isLogin) {
        return(
            <Redirect to='/auth'/>
        );
    }
    const firstPart = (payment) => {
        const person = payment.debtors[0];
        if (payment.author.login == login) {
            return (
                <div className="payment_info">
                    <span className="payment_text">{'вы заплатили ' + payment.count + 'p  ->' + person.name + ' ' + person.surname}</span>
                </div>
            );
        } else {
            return (
                <div className="payment_info">
                    <span className="payment_text">{payment.author.name + ' ' + payment.author.surname + ' заплатил ' + payment.count + 'p  -> ' + person.name + ' ' + person.surname}</span>
                </div>
            );
        }
    }
    return (
        <div className="pay_items">
            <div className="main_payment_block">
                <img src="/dollar.png" alt=""></img>
            </div>
            {firstPart(payment)}
         </div>
    );
}








/*
({payment}) {
    const login = 'mikovalnya';
    return (
        <div className="exp_part_items">
            <div className='test'>
                <div className='my_block'>
                    {payment.debtors.map(elem => <p className='debtor'>{elem.name + ' ' + elem.surname + ' должен ' + elem.debt}</p>)}
                </div>
                <p>
                    <div>
                        {payment.date + ' ' + payment.author.name + ' ' + payment.author.surname + ' вернул ' + payment.count + ' - ' + payment.debtors[0].name + ' ' + payment.debtors[0].surname}
                    </div>
                </p>
            </div>
         </div>
    );
}
*/
export default Payment;