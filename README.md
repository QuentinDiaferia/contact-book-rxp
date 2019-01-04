# Contact Book

A simple contact book app using ReactXP and NoSQLProvider.

## NoSQLProvider

```
npm install --save react-native-sqlite-storage
```

### Gradle configuration

In `android/app/app.iml`:

```xml
<orderEntry type="module" module-name="react-native-sqlite-storage" />
```

In `android/app/build.gradle`:

```
dependencies {
    ...
    implementation project(':react-native-sqlite-storage')
}
```

In `android/app/src/main/java/com/rxpcontactbook/MainApplication.java`:

```java
import org.pgsqlite.SQLitePluginPackage;

...

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new SQLitePluginPackage(),
          ...
      );
    }
```

In `android/settings.gradle`:

```
include ':react-native-sqlite-storage'
project(':react-native-sqlite-storage').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-sqlite-storage/src/android')
```
