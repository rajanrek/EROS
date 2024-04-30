package app.feelgoodcontacts.com.feelgoodcontact;

import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CustomWebViewModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public CustomWebViewModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }
private void sendEvent(String eventName, @Nullable WritableMap params) {
        ReactContext reactContext = getReactApplicationContext();
        if (reactContext != null) {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

    // Method to receive message from JavaScript
    @ReactMethod
    public void receiveMessage(String message) {
        // Handle the received message here
    }

    @Override
    public String getName() {
        return "CustomWebView";
    }

    @ReactMethod
    public void openURL(String url) {
        Uri webpage = Uri.parse(url);
        Intent intent = new Intent(Intent.ACTION_VIEW, webpage);
        if (intent.resolveActivity(reactContext.getPackageManager()) != null) {
            reactContext.startActivity(intent);
        }
    }
}
