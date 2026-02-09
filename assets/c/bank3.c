#include <stdio.h>
#include <pthread.h>

typedef struct {
    int cash;
    pthread_mutex_t lock;
} Bank;

static Bank the_bank;

void deposit(int n) {
    pthread_mutex_lock(&the_bank.lock);
    the_bank.cash += n;
    pthread_mutex_unlock(&the_bank.lock);
}

void withdraw(int n) {
    pthread_mutex_lock(&the_bank.lock);
    if (the_bank.cash >= n) {
        the_bank.cash -= n;
    }
    pthread_mutex_unlock(&the_bank.lock);
}

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

  int N = 16;
  pthread_t tids[N];
  for (int i = 0; i < N; ++i) {
    pthread_create(&tids[i], NULL, &customer, NULL);
  }

  for (int i = 0; i < N; ++i) {
    pthread_join(tids[i], NULL);
  }

  printf("Total: %d\n", the_bank.cash);

  return 0;
}
