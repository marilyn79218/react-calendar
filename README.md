# DatePicker Storybook

## Demo page
```sh
yarn storybook
```

## Developing Features
1.  React.js
2.  CSS module.
3.  Lint checking before commits.
4.  [Flow type][df1] checking.

[df1]: <https://flow.org/>

## Commit checking
* flowtype
* eslint for staged files

## Build checking
* flowtype
* eslint

# Calendar Component API
| Name  | Type | Default | Description |
| :---: | :--: | :-----: | :---------: |
| date | Moment | moment() | The selected date |
| onSelect | function(date) | | Called when a date is selected |
| setIsCalendarOpen | function(boolean) |  | Toggle Calendar open or close |
