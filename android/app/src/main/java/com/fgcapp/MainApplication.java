package app.feelgoodcontacts.com.feelgoodcontact;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.annotation.RequiresApi;
// import androidx.multidex.MultiDexApplication;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
// import com.lugg.RNCConfig.RNCConfigPackage;
// import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
import com.emarsys.Emarsys;
import com.emarsys.config.EmarsysConfig;
import com.emarsys.rnwrapper.RNEmarsysEventHandler;
import com.emarsys.rnwrapper.RNEmarsysWrapperPackage;
import com.swmansion.reanimated.ReanimatedPackage;
// import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
        
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new GoogleAnalyticsBridgePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

       EmarsysConfig config = new EmarsysConfig.Builder()
    .application(this)
    .applicationCode("EMSB0-AE2DC") // your application code
    .merchantId("17690ABB029FC6AE") // your predict merchant ID
    .enableVerboseConsoleLogging()
    .build();
    
    createNotificationChannels();
    Emarsys.setup(config);

    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
  
    RNEmarsysEventHandler eventHandler = RNEmarsysEventHandler.getInstance();
    eventHandler.setEventHandlers();
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

   private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= 26) {
          createNotificationChannel("default", "feelgoodcontacts", "News and updates go into this channel", NotificationManager.IMPORTANCE_HIGH);
          createNotificationChannel("default", "feelgoodcontacts", "Important messages go into this channel", NotificationManager.IMPORTANCE_HIGH);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void createNotificationChannel(String id, String name, String description, int importance) {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        NotificationChannel channel = new NotificationChannel(id, name, importance);
        channel.setDescription(description);
        notificationManager.createNotificationChannel(channel);
    }
}
