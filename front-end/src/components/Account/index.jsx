import "./account.css";

import dataAccount from "../../data/dataAccount.json";

export default function Account() {
  return (
    <main className="main bg-dark">
      <h2 className="sr-only">Accounts</h2>
      {dataAccount.map((account, idx) => (
        <section className="account" key={idx}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
}
