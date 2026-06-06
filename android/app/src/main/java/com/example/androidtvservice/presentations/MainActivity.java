package com.example.androidtvservice.presentations;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidtvservice.NewsContext;
import com.example.androidtvservice.R;
import com.example.androidtvservice.presentations.adapters.NewsAdapter;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        RecyclerView newsRV = findViewById(R.id.newsRV);
        NewsAdapter newsAdapter = new NewsAdapter(this, NewsContext.allNews());
        newsRV.setAdapter(newsAdapter);
    }
}