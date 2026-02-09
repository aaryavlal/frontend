#include <stdio.h>
#include <pthread.h>

typedef struct {
    int cash;
} Bank;

static Bank the_bank;

void deposit(int n) {
    the_bank.cash += n;
}

void withdraw(int n) {
    if (the_bank.cash >= n) {
        the_bank.cash -= n;
    }
}

// Let's assume one customer performs 5000 withdraws and 5000 deposit actions
void* customer(void* args) {
  for (int i = 0; i < 5000; ++i) {
    deposit(2);
  }

  for (int i = 0; i < 5000; ++i) {
    withdraw(2);
  }

  return NULL;
}

int main() {
  the_bank.cash = 0;

  // Create a thread for 16 customers
  int N = 16;
  pthread_t tids[N];
  for (int i = 0; i < N; ++i) {
    pthread_create(&tids[i], NULL, &customer, NULL);
  }

  // Wait til each one is done
  for (int i = 0; i < N; ++i) {
    pthread_join(tids[i], NULL);
  }

  printf("Total: %d\n", the_bank.cash);

  return 0;
}
