# skyux-template-library

### Template for SKY UX component libraries

### Getting Started
- Add custom modules to the **src/app/shared/components** directory
- Update exports in **src/app/shared/components/index.ts**
- Update `name` in **package.json**
- Update `name` in **skyuxconfig.json**
- Update `output.library` in **config/webpack/webpack.bundle.config.js**
- Update `my-library` directory in **src/app/shared/components**

### Bundle your library:

```
npm run build
```

### Test your library:

```
npm run test
```
