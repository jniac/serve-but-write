# serve-but-write

usage: 
```js
res = await fetch('foo.txt', {
    method: 'POST',
    body: 'bar is cool',
})
await res.text()
```

### dev
```
npm pack
npm i -g jniac-serve-but-write-1.0.0.tgz
```

```
npm pack && npm link && npm i -g jniac-serve-but-write-1.0.0.tgz
```

