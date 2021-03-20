import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    const typeValidate = ['income', 'outcome'].includes(type);
    if (!typeValidate) {
      throw new Error('O tipo é só número seu merda');
    }

    const typeOfTransaction = type === 'outcome';
    const valueValidate =
      this.transactionsRepository.getBalance().total < value;

    if (typeOfTransaction && valueValidate) {
      throw new Error('Ta sem grana seu merda');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
