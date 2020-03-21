// use case:
// lazyman('jackson').sleepFirst(5).eat('an apple').sleep(3);
/*
output:
  Sleep...
  (Wait 5s)
  Wake up after 5s
  Hi jackson
  Eat an apple
  Sleep...
  (Wait 3s)
  Wake up after 3s
*/

const lazyman = name => new LazyMan(name);

class LazyMan {
    constructor(name) {
        this.tasks = [];
        const task = () => {
            console.log('Hi', name);
            this.next();
        };
        this.tasks.push(task);
        this.schedule();
    }

    eat(name) {
        const task = () => {
            console.log('Eat', name);
            this.next();
        };
        this.tasks.push(task);
        return this;
    }

    sleep(time) {
        const task = () => {
            console.log('Sleep...');
            setTimeout(() => {
                console.log('Wake up after', time + 's');
                this.next();
            }, time * 1000);
        }
        this.tasks.push(task);
        return this;
    }

    sleepFirst(time) {
        const task = () => {
            console.log('Sleep...');
            setTimeout(() => {
                console.log('Wake up after', time + 's');
                this.next();
            }, time * 1000);
        }
        this.tasks.unshift(task);
        return this;
    }

    next() {
        const task = this.tasks.shift();
        task && task();
    }

    schedule() {
        setTimeout(() => {
            this.next();
        }, 0);
    }
}
