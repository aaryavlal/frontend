#include <stdio.h>

// Define a bank struct which tracks money (cash)
typedef struct {
    int cash;
} Bank;

static Bank the_bank;

// The customer can withdraw or deposit cash to the bank
void deposit(int n) {
    the_bank.cash += n;
}

void withdraw(int n) {
    if (the_bank.cash >= n) {
        the_bank.cash -= n;
    }
}

// Simulate a customer doing some series of actions
void* customer(void* args) {
    for (int i = 0; i < 100; ++i) {
        deposit(2);
    }

    for (int i = 0; i < 100; ++i) {
        withdraw(2);
    }

    return NULL;
}

// We should get 0 balance at the end
int main() {
    the_bank.cash = 0;
    customer(NULL);
    printf("Total: %d\n", the_bank.cash);
    return 0;
}
