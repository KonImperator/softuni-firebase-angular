# 🌌 Anime Galaxy

**Working Demo**: Check it out @ https://softuni-firebase-angular.web.app/

**Comment**: My first ever project built from scratch without a tutorial with Angular. I started this without much experience and knowledge in CSS, tailwind CSS or using pre-made components so that part is a bit of a mess and the website was unfortunately not made to be responsive. Although it can be fixed, it would take a longer time than I am willing to spare on the project. Design-wise for desktop I think it turned out not so bad. The next one should be better.
## 🌠 Features:

- **Vast Anime Collection**: Seamlessly load and view a comprehensive database of available anime.
- **Color Scheme**: Uses preferred color scheme of Device.
- **Intuitive Pagination and Search**: Find and navigate to your preferred anime with ease.
- **User Authentication**: Securely sign up and log in with robust Firebase authentication.
- **Profile Editing**: Allows the following:
  - Modifying email, display name, and password.
  - Uploading a personal avatar or selecting from an exclusive gallery.
- **Anime Lists**:
  - Track anime you love with the *Liked List*.
  - Plan your next binge with the *Watchlist*.
- **Lazy loading**: Implemented to test out the effects of the feature.

## 🎡 Backend Architecture - Firebase + Jikan API:

- **User Authentication**: Employs Firebase Authentication for a secure user experience.
- **Data Storage**: Leverages Firestore for storing user-related data:
  - **Main User Collection**: Contains documents uniquely identified by user IDs housing user data.
  - **Sub-collections**: Dedicated to the user's anime 'Liked' and 'Watchlist' with anime IDs as unique identifiers pointing to specific anime details.
- **Anime API**: Utilizes the Jikan API, an unofficial MAL API, to fetch extensive anime details.
- **Avatar Storage**: Firebase's Cloud Storage hosts user avatars with the naming convention: `userID|avatar`.

## 🚀 Project Structure:

- **Core Module**: Houses essential singleton services and components.
- **Shared Module**: Consists of common components, directives, and pipes that are used across the app.
- **User Module**: Focused on user-centric features like authentication, profile management, etc.
- **Anime Module**: Deals with all things anime, from listing to detailed views.
- **Environments**: Separate environments.

## Default Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
