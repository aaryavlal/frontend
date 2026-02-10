struct Bank {
    cash: i32,
}

static mut the_bank: Bank = Bank { cash: 0 };

fn deposit(n: i32) {
    the_bank.cash += n;
}

fn main() {
    deposit(2);
}
