# [Odin BattleShip](https://battleship.xonin.dev/)

Final project in "the odin project" JavaScript Course, it demonstrates Unit Testing, Test Driven Development and jest. [The Odin Project-JavaScript](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript).

## Links

[Visit website](https://battleship.xonin.dev/)

## Technologies used

![HTML5](https://img.shields.io/badge/html5-E34F26.svg?style=for-the-badge&logo=html5&logoColor=FFF)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Features

-

## Things I got a better understanding of

-Writing tests
-Better understanding of TDD
-Dealing with multiple modules

## Jest Watch

To use jest Watch: `npm run test -- --watch`

check for [source](https://stackoverflow.com/questions/25472665/watch-and-rerun-jest-js-tests)

## How to I managed to deploy this project

### Step 1

add dist & src files and commit them to github

```sh
git add dist
git add src
git commit -m "Initial dist & src subtree commit"
```

### Step 2

create gh-pages then push dist to it

```sh
git subtree push --prefix dist origin gh-pages
```

### Step 3

checkout to new branch then share src file with it

```sh
git checkout gh-pages
git checkout main src/
```

### Step 4

add and commit your changes

```sh
git add src
git commit -m "Add src to branch"
git push
git checkout main
```

### Step 5

then just go to netlify and deploy your project using on the new branch


#### Srouces

- https://gist.github.com/cobyism/4730490
- https://www.30secondsofcode.org/git/s/copy-file-from-branch

## Credits

This project was made by [Xonin](https://github.com/xonin-hush) for The Odin Project.
