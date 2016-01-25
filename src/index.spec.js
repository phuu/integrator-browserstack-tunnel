import test from 'ava';
import mockSpawn from 'mock-spawn';
import IntegratorBrowserStackTunnel from './index';

test('constructor sets key', t => {
    t.plan(1);
    var a = new IntegratorBrowserStackTunnel('123');
    t.is(a.key, '123');
});

test('before() spawns a process, waits for startup message, leaves process running', t => {
    t.plan(3);

    let mySpawn = mockSpawn();
    require('child_process').spawn = mySpawn;
    mySpawn.sequence.add(function () {
        this.stdout.write('Press Ctrl-C to exit');
    });

    var a = new IntegratorBrowserStackTunnel('123');

    return a.before().then(() => {
        t.false(mySpawn.calls[0].ended);
        t.same(mySpawn.calls[0].command, '../bin/BrowserStackLocal');
        t.same(mySpawn.calls[0].args[0], '123');
    });
});

test('after() returns a promise and kills the process', t => {
    t.plan(2);

    let mySpawn = mockSpawn();
    require('child_process').spawn = mySpawn;
    mySpawn.sequence.add(function (cb) {
        this.stdout.write('Press Ctrl-C to exit');
    });
    mySpawn.setSignals({SIGTERM:true});

    var a = new IntegratorBrowserStackTunnel('123');
    return a.before().then(() => {
        return a.after().then(() => {
            t.true(mySpawn.calls[0].ended);
            t.pass();
        });
    });
});