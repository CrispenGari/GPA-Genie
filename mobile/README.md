### Mobile

This is a mobile application built with react native to consume the REST api.

### 🦋 Screenshots

Here are some demo screenshot for the mobile app.

<p align="center">
<img src="/images/0.jpg" alt="demo" width="200"/>
<img src="/images/1.jpg" alt="demo" width="200"/>
<img src="/images/2.jpg" alt="demo" width="200"/>
<img src="/images/3.jpg" alt="demo" width="200"/>
</p>

Inspecting output of `eas` build

```shell
eas build:inspect --platform android --stage archive --output inspect-output
```

Creating an `apk` file.

```shell
eas build -p android --profile preview --clear-cache
```
