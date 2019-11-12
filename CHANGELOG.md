
# 2.0.2

- introduced more concise import technique for `moment.js` that doesn't
  cause host application to load entire `moment.js` bundle with all the locales

# 2.0.0

- added support for Angular 8
- implemented package building using "ng-packagr"
- refactored dependencies, some dependencies are now marked as peer ones
- BirthDateValidator is now supporting multiple date values (Date, moment.js, js-joda)
