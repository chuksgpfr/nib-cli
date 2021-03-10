# Node Init BootStrapper CLI -- nib-cli
This is a CLI package that simplifies your life as a Node JS developer.

This pacakge creates the initial files and folders for your node js API project using either express or fastify as stated by you using `--server fastify`

## To use this package you must have node js installed

> ✨ How to use
- Use without installing generally
```
npx nib-cli --package yarn --server express
```
- Use after installing generally
```
npm i -g nib-cli
nib-cli --package yarn --server express
```
> 📝 NOTES

`--package` is either `yarn` or `npm` but defaults to npm

Currently we only support two servers, express and fastify, we'll be looking to support other servers in the future. 

