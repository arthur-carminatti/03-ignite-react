import { useContextSelector } from 'use-context-selector';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { Trash } from 'phosphor-react';

export function Transactions() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return (
            context.transactions
        )
    })

    const deleteTransaction = useContextSelector(TransactionsContext, (context) => {
        return (
            context.deleteTransaction
        )
    })

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            function removerTransaction() {
                                deleteTransaction(transaction.id)
                            }
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                    <td>
                                        <button onClick={removerTransaction}>
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}