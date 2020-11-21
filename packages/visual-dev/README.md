# visual-dev

Template repo for visual development for Saasquatch products.

## Adding new components

1. Create a folder in Title Case of the name of the component/category within the `components` folder

2. Create an `index.ts` at the root of the component's named folder that exports everything from the various component files:

	**For example**
	```js
	export * from './PrimaryButton'
	export * from './SecondaryButton'
	```

3. Use named exports for your components

## Best Practices

Organise your stories title by making them **exactly the same** as their relative directory path from the stories folder

_i.e._ `src/stories/components/Button` should have the title "Components/Button/{variant}"

## Usage

To install dependencies
``` 
$ npm install
```

To build
```
$ npm run build 
```

To run tests
```
$ npm run test
```

To run Storybook
``` 
$ npm run storybook
```

