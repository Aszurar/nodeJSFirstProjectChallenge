import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRepository = new TransactionsRepository();
const transactionRouter = Router();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const results = {
      transactions,
      balance,
    };
    return response.json(results);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // recebendo os dados do front-end
    const { title, value, type } = request.body;

    // instanciando o serviço de criação das instâncias de transação
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // criando uma instâmcia de transação e salvando no vetor de transações
    // do repositório.
    const transaction = createTransaction.execute({ title, value, type });

    // retornando a transação recem criada
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
