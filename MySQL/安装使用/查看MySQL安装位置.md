```javascript
ps -ef|grep mysql // 查看mysql进程服务
```

```
   74   115     1   0  5:16下午 ??         0:03.04 /usr/local/mysql/bin/mysqld --user=_mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --plugin-dir=/usr/local/mysql/lib/plugin --log-error=/usr/local/mysql/data/mysqld.local.err --pid-file=/usr/local/mysql/data/mysqld.local.pid --keyring-file-data=/usr/local/mysql/keyring/keyring --early-plugin-load=keyring_file=keyring_file.so
  501  2945  2898   0  7:54下午 ttys000    0:00.00 grep mysql
```

