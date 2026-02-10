struct Bank {
    cash: i32,
}

fn deposit(mut the_bank: Bank, n: i32) {
    the_bank.cash += n;
}

fn main() {
    let mut the_bank = Bank { cash: 0 };

    deposit(the_bank, 2);
    deposit(the_bank, 2);
}
