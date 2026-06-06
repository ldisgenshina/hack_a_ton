package com.example.androidtvservice.presentations;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidtvservice.NewsContext;
import com.example.androidtvservice.R;
import com.example.androidtvservice.presentations.adapters.NewsAdapter;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {
    Timer timer;
    ImageView addIV;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        RecyclerView newsRV = findViewById(R.id.newsRV);
        addIV = findViewById(R.id.adIV);
        NewsAdapter newsAdapter = new NewsAdapter(this, NewsContext.allNews());
        newsRV.setAdapter(newsAdapter);
        timer = new Timer();
        timer.schedule(timerTask,0,20000);
    }
    TimerTask timerTask = new TimerTask() {
        @Override
        public void run() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (addIV != null){
                        if (addIV.getVisibility() == View.INVISIBLE)
                            addIV.setVisibility(View.VISIBLE);
                        else addIV.setVisibility(View.INVISIBLE);
                    }
                }
            });
        }
    };
}