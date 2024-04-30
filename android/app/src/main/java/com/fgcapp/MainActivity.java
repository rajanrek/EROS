package app.feelgoodcontacts.com.feelgoodcontact;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import java.text.MessageFormat;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import androidx.appcompat.app.AppCompatActivity;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.widget.ImageView;
// import androidx.appcompat.app.main;
// import android.support.compat.R;

public class MainActivity extends ReactActivity {

    private ScaleGestureDetector scaleGestureDetector;  
   private float mScaleFactor = 1.0f;
   private ImageView imageView; 

  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FgcApp";
  }

  @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
      // setContentView(androidx.appcompat.app.activity_main);
      // imageView=findViewById(androidx.appcompat.app.id.imageView);
      scaleGestureDetector = new ScaleGestureDetector(this, new ScaleListener());
        Intent intent = getIntent();
        String action = intent.getAction();
        Uri data = intent.getData();

        Log.i("++++++++++++++++++ TRACK JAVA onCreate", MessageFormat.format("intent: {0}, action: {1}, URL: {2}", intent, action, data));
    }

     @Override
   public boolean onTouchEvent(MotionEvent motionEvent) {
      scaleGestureDetector.onTouchEvent(motionEvent);
      return true;
   }
   private class ScaleListener extends ScaleGestureDetector.SimpleOnScaleGestureListener {
      @Override
      public boolean onScale(ScaleGestureDetector scaleGestureDetector) {
         mScaleFactor *= scaleGestureDetector.getScaleFactor();
         mScaleFactor = Math.max(0.1f, Math.min(mScaleFactor, 10.0f));
         imageView.setScaleX(mScaleFactor);
         imageView.setScaleY(mScaleFactor);
         return true;
      }
   }
    
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        String action = intent.getAction();
        Uri data = intent.getData();

        Log.i("++++++++++++++++++ TRACK JAVA onNewIntent", MessageFormat.format("intent: {0}, action: {1}, URL: {2}", intent, action, data));
    }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
}
