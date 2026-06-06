package com.example.androidtvservice.presentations;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidtvservice.NewsContext;
import com.example.androidtvservice.R;
import com.example.androidtvservice.presentations.adapters.NewsAdapter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {
    Timer timer;
    Timer timerImage;
    ImageView addIV;
    ArrayList<Integer> screenList = new ArrayList<>();
    int thisScreen = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        RecyclerView newsRV = findViewById(R.id.newsRV);
        addIV = findViewById(R.id.adIV);
        NewsAdapter newsAdapter = new NewsAdapter(this, NewsContext.allNews());
        newsRV.setAdapter(newsAdapter);
        screenList.add(R.drawable.screen);
        screenList.add(R.drawable.screen2);
        screenList.add(R.drawable.screen3);
        timer = new Timer();
        timer.schedule(imageChangeTimerTask,0,20000);
        timerImage = new Timer();
        timerImage.schedule(imageTimerTask,5,5000);
    }
    TimerTask imageChangeTimerTask = new TimerTask() {
        @Override
        public void run() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (addIV != null){
                        if (addIV.getVisibility() == View.INVISIBLE){
                            addIV.setVisibility(View.VISIBLE);
                        }
                        else {
                            addIV.setVisibility(View.INVISIBLE);
                        }
                    }
                }
            });
        }
    };
    TimerTask imageTimerTask = new TimerTask() {
        @Override
        public void run() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (screenList.size() > thisScreen){
                        addIV.setImageResource(screenList.get(thisScreen));
                        thisScreen++;
                    }
                    else thisScreen = 0;
                }
            });
        }
    };
}